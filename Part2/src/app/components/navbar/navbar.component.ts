/* student name: Hao Wang ID: 24832782*/
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router'; // 👈 增加 RouterLinkActive

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive], // 👈 在这里注册它
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent { }