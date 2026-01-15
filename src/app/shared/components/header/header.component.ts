import { Component } from "@angular/core"
import { RouterModule } from "@angular/router"
import {AuthService} from '../../../core/auth/auth.service';

@Component({
  selector: "app-header",
  standalone: true,
  imports: [RouterModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent {
  isMenuOpen = false

  constructor(public authService: AuthService) {
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen
  }
}
