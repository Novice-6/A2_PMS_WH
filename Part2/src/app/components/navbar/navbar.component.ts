/* student name: Hao Wang ID: 24832782*/
import { Component } from '@angular/core';
// Introduce the routing components RouterLink and RouterLinkActive
import { RouterLink, RouterLinkActive } from '@angular/router';

// NavbarComponent: Navigation bar component for the application.
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent { }