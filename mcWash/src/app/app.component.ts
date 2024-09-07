import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, RouterLink, RouterLinkActive,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mcWash';
  isNavOpen = false;

  toggleNavbar() {
    this.isNavOpen = !this.isNavOpen;
  }

  closeNavbar() {
    this.isNavOpen = false;
  }
}
