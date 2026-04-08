/* student name: Hao Wang ID: 24832782*/  
import { Component } from '@angular/core';
// The directive for creating links that trigger navigation.
import { RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink], // Register the RouterLink directive here
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent { }