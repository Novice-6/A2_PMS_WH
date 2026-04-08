import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService, Item } from '../../services/inventory.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  searchTerm: string = '';
  displayItems: Item[] = [];

  constructor(private inventoryService: InventoryService) {}

  ngOnInit() {
    this.showAll(); // 页面初始加载时，显示所有数据
  }

  // 点击 Search 按钮时触发
  onSearch() {
    const allItems = this.inventoryService.getItems();
    if (!this.searchTerm.trim()) {
      this.displayItems = allItems;
    } else {
      this.displayItems = allItems.filter(item => 
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  // 过滤受欢迎的物品
  showPopular() {
    this.displayItems = this.inventoryService.getItems().filter(item => item.isPopular);
  }

  // 新增：重置并显示所有物品
  showAll() {
    this.searchTerm = ''; // 清空搜索框
    this.displayItems = this.inventoryService.getItems(); // 重新拉取完整数组
  }
}