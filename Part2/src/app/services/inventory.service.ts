/* student name: Hao Wang ID: 24832782*/
import { Injectable } from '@angular/core';

// Item interface for inventory items
export interface Item {
  id: string; name: string; category: string; quantity: number;
  price: number; supplier: string; stockStatus: string; isPopular: boolean; comment?: string;
}

@Injectable({
  providedIn: 'root' // Ensure that the data is not lost during the route switching process.
})
export class InventoryService {
  // Store inventory items
  private inventory: Item[] = [];

    getItems(): Item[] { return this.inventory; }

  // Add new item with unique ID and name checks
  addItem(item: Item): { success: boolean, msg: string } {
    if (this.inventory.some(i => i.id === item.id)) return { success: false, msg: 'Error: ID must be unique!' };
    if (this.inventory.some(i => i.name === item.name)) return { success: false, msg: 'Error: Name must be unique!' };
    this.inventory.push({ ...item }); // Create copy to avoid reference issues
    return { success: true, msg: `Item "${item.name}" added successfully!` };
  }

  // Update item by name (assignment requirement)
  updateItemByName(item: Item): boolean {
    const index = this.inventory.findIndex(i => i.name === item.name);
    if (index === -1) return false;
    item.id = this.inventory[index].id; // Preserve original ID
    this.inventory[index] = { ...item };
    return true;
  }

  // Delete item by name (assignment requirement)
  deleteItemByName(name: string): boolean {
    const initialLength = this.inventory.length;
    this.inventory = this.inventory.filter(i => i.name !== name);
    return this.inventory.length !== initialLength;
  }
}