import {Component, computed, Signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService, User} from '../../../core/auth/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile-container">
      <div class="glass-panel profile-card">
        <div class="profile-header">
          <div class="avatar-circle">
            {{ user()?.username?.charAt(0)?.toUpperCase() }}
          </div>
          <h1>{{ user()?.username }}</h1>
          <div class="roles">
            <!--            <span class="role-badge" *ngFor="let role of user()?.roles">{{ role }}</span>-->
            @for (role of user()?.roles; track role) {
              <span class="role-badge">
                <pre>{{ user()?.roles | json }}</pre>
<!--                 {{ role.authority?.replace('ROLE_', '') }}-->
              </span>
            } @empty {
              <span class="role-badge">No Roles Assigned</span>
            }
          </div>
        </div>

        <div class="profile-details">
          <div class="detail-item">
            <label>Username</label>
            <div class="value">{{ user()?.username }}</div>
          </div>
          <!-- Add more details if available via API call -->
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      display: flex;
      justify-content: center;
      padding: 4rem;
    }

    .profile-card {
      width: 100%;
      max-width: 500px;
      padding: 3rem;
      text-align: center;
    }

    .avatar-circle {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, #0ea5e9, #2563eb);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5rem;
      font-weight: bold;
      color: white;
      margin: 0 auto 1.5rem;
    }

    .glass-panel {
      background: rgba(30, 41, 59, 0.4);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(148, 163, 184, 0.1);
      border-radius: 16px;
    }

    h1 {
      color: white;
      margin-bottom: 0.5rem;
    }

    .roles {
      display: flex;
      gap: 0.5rem;
      justify-content: center;
      margin-bottom: 2rem;
    }

    .role-badge {
      background: rgba(148, 163, 184, 0.1);
      color: #94a3b8;
      padding: 4px 12px;
      border-radius: 99px;
      font-size: 0.85rem;
    }

    .profile-details {
      text-align: left;
    }

    .detail-item {
      margin-bottom: 1.5rem;
    }

    .detail-item label {
      display: block;
      color: #64748b;
      font-size: 0.9rem;
      margin-bottom: 0.25rem;
    }

    .detail-item .value {
      color: #f8fafc;
      font-size: 1.1rem;
    }
  `]
})
export class ProfileComponent {
  user: Signal<User | null>;

  constructor(private authService: AuthService) {
    this.user = this.authService.currentUser;
    console.log(this.user());
  }
}
