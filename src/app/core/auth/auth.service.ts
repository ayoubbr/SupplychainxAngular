import { Injectable, signal } from '@angular/core';
import { AuthApi, AuthResponse, LoginRequest, RegisterRequest } from '../../api/auth.api';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

export interface User {
    username: string;
    roles: string[];
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    currentUser = signal<User | null>(null);

    constructor(private api: AuthApi, private router: Router) {
        // Initial load from local storage
        const token = this.getAccessToken();
        if (token) {
            this.decodeAndSetUser(token);
        }
    }

    login(credentials: LoginRequest) {
        return this.api.login(credentials).pipe(
            tap((response: AuthResponse) => {
                this.saveTokens(response);
                this.decodeAndSetUser(response.accessToken);
            })
        );
    }

    register(data: RegisterRequest) {
        return this.api.register(data);
    }

    logout() {
        this.api.logout().subscribe({
            next: () => this.clearSession(),
            error: () => this.clearSession() // Clear anyway
        });
    }

    private clearSession() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        this.currentUser.set(null);
        this.router.navigate(['/login']);
    }

    saveTokens(response: AuthResponse) {
        localStorage.setItem('access_token', response.accessToken);
        localStorage.setItem('refresh_token', response.refreshToken);
    }

    getAccessToken(): string | null {
        return localStorage.getItem('access_token');
    }

    isAuthenticated(): boolean {
        return !!this.currentUser();
    }

    hasAnyRole(requiredRoles: string[]): boolean {
        const user = this.currentUser();
        if (!user || !user.roles) return false;

        // Normalize roles (handle potentially missing 'ROLE_' prefix in comparison if needed, 
        // though typically we store 'ROLE_ADMIN' directly)
        return user.roles.some(role => requiredRoles.includes(role));
    }

    private decodeAndSetUser(token: string) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            // Expecting payload to have 'sub' and 'roles' as per standard JWT or Spring Security
            // Handle roles whether they are ["ROLE"] or [{authority: "ROLE"}]
            let roles: string[] = [];
            if (Array.isArray(payload.roles)) {
                roles = payload.roles.map((r: any) => {
                    if (typeof r === 'string') return r;
                    if (r && typeof r === 'object' && 'authority' in r) return r.authority;
                    return String(r);
                });
            }

            const user: User = {
                username: payload.sub,
                roles: roles
            };

            this.currentUser.set(user);
        } catch (e) {
            console.error('Failed to decode token', e);
            this.currentUser.set(null);
        }
    }
}
