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
  // Initialize the currentItem with default values.
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
  
  // Message variables for display on the UI.
  message: string = '';
  isError: boolean = false;
  showDeleteConfirm: boolean = false;

  // Constructor: Inject the InventoryService.
  constructor(private inventoryService: InventoryService) {}

  // Show toast message on the UI.
  showToast(msg: string, isErr: boolean) {
    this.message = msg;
    this.isError = isErr;
    setTimeout(() => { this.message = ''; }, 3000);
  }

  // Add item to the inventory.
  onAdd() {
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
    
    // Clear the input fields if the addition is successful.
    if (result.success) {
      this.currentItem = { id: '', name: '', category: 'Electronics', supplier: '', quantity: 0, price: 0, stockStatus: 'In Stock', isPopular: false, comment: '' };
    }
  }

  /**
   * Updates an existing item in the inventory based on its name.
   * Validates that the item name is provided before attempting the update.
   * Displays a success or error message depending on the result.
   */
  onUpdate() {
    // Validate that the item name is not empty
    if (this.currentItem.name === '') { 
      this.showToast("Error: Name is required to update!", true); 
      return; 
    }
    
    // Attempt to update the item by name via the inventory service
    const success = this.inventoryService.updateItemByName(this.currentItem);
    if (success) {
      this.showToast("Item updated successfully!", false);
    } else {
      this.showToast("Item name not found!", true);
    }
  }

  /**
   * Triggers the delete action.
   * Validates if the current item name is empty. If empty, shows an error toast and returns.
   * Otherwise, displays the delete confirmation dialog.
   */
  triggerDelete() {
    if (this.currentItem.name === '') { 
      this.showToast("Error: Enter name to delete!", true); 
      return; 
    }
    this.showDeleteConfirm = true; // Show delete confirmation dialog
  }

  /**
   * Executes the deletion of the current item.
   * Calls the inventory service to delete the item by name and displays a toast notification
   * based on the result. Finally, hides the delete confirmation dialog.
   */
  executeDelete() {
    const success = this.inventoryService.deleteItemByName(this.currentItem.name);
    if (success) {
      this.showToast("Item deleted!", false);
    } else {
      this.showToast("Item not found!", true);
    }
    this.showDeleteConfirm = false; // Hide delete confirmation dialog
  }

  cancelDelete() {
    this.showDeleteConfirm = false; 
  }
}