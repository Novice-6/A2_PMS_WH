import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // 引入 RouterLink

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink], // 在这里注册
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent { }