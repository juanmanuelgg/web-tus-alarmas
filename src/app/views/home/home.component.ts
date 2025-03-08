import { Component, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly router = inject(Router);

  constructor() {}

  public logout() {
    localStorage.removeItem('email');
    this.router.navigate(['/login']);
  }
}
