import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService, Item } from '../../services/inventory.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule], // 导入必要的模块
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  searchTerm: string = '';
  displayItems: Item[] = [];

  constructor(private inventoryService: InventoryService) {}

  // 页面加载时获取所有数据
  ngOnInit() {
    this.displayItems = this.inventoryService.getItems();
  }

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

  showPopular() {
    this.displayItems = this.inventoryService.getItems().filter(item => item.isPopular);
  }
}