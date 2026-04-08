/* student name: Hao Wang ID: 24832782*/
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
    this.showAll(); // Initialize by displaying all items on page load
  }

  // Triggered when the Search button is clicked or Enter key is pressed
  onSearch() {
    const allItems = this.inventoryService.getItems();
    if (!this.searchTerm.trim()) {
      this.displayItems = allItems; // Show all items if search term is empty
    } else {
      // Filter items by name (case-insensitive)
      this.displayItems = allItems.filter(item => 
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  // Filter and display only popular items
  showPopular() {
    this.displayItems = this.inventoryService.getItems().filter(item => item.isPopular);
  }

  // Reset search term and display all items
  showAll() {
    this.searchTerm = ''; // Clear the search input field
    this.displayItems = this.inventoryService.getItems(); // Reload full item list
  }
}