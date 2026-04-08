import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Navbar Component: The navigation bar component.
import { NavbarComponent } from './components/navbar/navbar.component'; 

// App Component: The root component of the application.
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent], // Register the NavbarComponent here.
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Part2';
}