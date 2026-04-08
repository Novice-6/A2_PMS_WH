/* student name: Hao Wang ID: 24832782*/  
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // 核心：必须导入这个模块才能实现无刷新跳转

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink], // 核心：在这里注册
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent { }