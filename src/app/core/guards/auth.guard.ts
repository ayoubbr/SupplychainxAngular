import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ToastService } from '../../shared/services/toast.service';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const toastService = inject(ToastService);
    const router = inject(Router);

    if (!authService.isAuthenticated()) {
        router.navigate(['/login']);
        return false;
    }

    const requiredRoles = route.data['roles'] as Array<string>;

    // If no specific roles required, allow access (since already authenticated)
    if (!requiredRoles || requiredRoles.length === 0) {
        return true;
    }

    // Check if user has any of the required roles
    if (authService.hasAnyRole(requiredRoles)) {
        return true;
    }

    // Access Denied
    toastService.error('Access Denied: You do not have permission to view this page.');
    return false;
};
