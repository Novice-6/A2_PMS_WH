/* student name: Hao Wang ID: 24832782*/
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { InventoryService, Item } from '../../services/inventory.service';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent {
  // 用最简单的方式初始化一个对象，学生一看就懂
  currentItem: Item = { 
    id: '', 
    name: '', 
    category: 'Electronics', 
    supplier: '',
    quantity: 0, 
    price: 0,
    stockStatus: 'In Stock', 
    isPopular: false,
    comment: ''
  };
  
  // 用于界面显示提示信息
  message: string = '';
  isError: boolean = false;
  showDeleteConfirm: boolean = false;

  constructor(private inventoryService: InventoryService) {}

  // 简单的提示函数
  showToast(msg: string, isErr: boolean) {
    this.message = msg;
    this.isError = isErr;
    setTimeout(() => { this.message = ''; }, 3000);
  }

  onAdd() {
    // 最基础的 if 验证
    if (this.currentItem.id === '' || this.currentItem.name === '' || this.currentItem.supplier === '') {
      this.showToast("Error: ID, Name and Supplier are required!", true);
      return;
    }
    if (this.currentItem.quantity < 0 || this.currentItem.price < 0) {
      this.showToast("Error: Numbers cannot be negative!", true);
      return;
    }

    const result = this.inventoryService.addItem(this.currentItem);
    this.showToast(result.msg, !result.success);
    
    // 成功后清空输入框
    if (result.success) {
      this.currentItem = { id: '', name: '', category: 'Electronics', supplier: '', quantity: 0, price: 0, stockStatus: 'In Stock', isPopular: false, comment: '' };
    }
  }

  onUpdate() {
    if (this.currentItem.name === '') { 
      this.showToast("Error: Name is required to update!", true); 
      return; 
    }
    
    const success = this.inventoryService.updateItemByName(this.currentItem);
    if (success) {
      this.showToast("Item updated successfully!", false);
    } else {
      this.showToast("Item name not found!", true);
    }
  }

  triggerDelete() {
    if (this.currentItem.name === '') { 
      this.showToast("Error: Enter name to delete!", true); 
      return; 
    }
    this.showDeleteConfirm = true; // 显示确认框
  }

  executeDelete() {
    const success = this.inventoryService.deleteItemByName(this.currentItem.name);
    if (success) {
      this.showToast("Item deleted!", false);
    } else {
      this.showToast("Item not found!", true);
    }
    this.showDeleteConfirm = false; // 隐藏确认框
  }

  cancelDelete() {
    this.showDeleteConfirm = false; // 隐藏确认框
  }
}