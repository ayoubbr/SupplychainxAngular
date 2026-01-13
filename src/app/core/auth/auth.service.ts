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

    private decodeAndSetUser(token: string) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            // Expecting payload to have 'sub' and 'roles' as per standard JWT or Spring Security
            const user: User = {
                username: payload.sub,
                roles: payload.roles || []
            };

            this.currentUser.set(user);
        } catch (e) {
            console.error('Failed to decode token', e);
            this.currentUser.set(null);
        }
    }
}
