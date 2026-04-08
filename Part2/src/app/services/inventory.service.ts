import { Injectable } from '@angular/core';

export interface Item {
  id: string; name: string; category: string; quantity: number;
  price: number; supplier: string; stockStatus: string; isPopular: boolean; comment?: string;
}

@Injectable({
  providedIn: 'root' // 保证数据在切换路由时不丢失
})
export class InventoryService {
  private inventory: Item[] = [];

  getItems(): Item[] { return this.inventory; }

  addItem(item: Item): { success: boolean, msg: string } {
    if (this.inventory.some(i => i.id === item.id)) return { success: false, msg: 'Error: ID must be unique!' };
    if (this.inventory.some(i => i.name === item.name)) return { success: false, msg: 'Error: Name must be unique!' };
    this.inventory.push({ ...item }); // 拷贝对象存入
    return { success: true, msg: `Item "${item.name}" added successfully!` };
  }

  // 根据名字更新 (题目硬性要求)
  updateItemByName(item: Item): boolean {
    const index = this.inventory.findIndex(i => i.name === item.name);
    if (index === -1) return false;
    item.id = this.inventory[index].id; // 锁定原有ID不允许改
    this.inventory[index] = { ...item };
    return true;
  }

  // 根据名字删除 (题目硬性要求)
  deleteItemByName(name: string): boolean {
    const initialLength = this.inventory.length;
    this.inventory = this.inventory.filter(i => i.name !== name);
    return this.inventory.length !== initialLength;
  }
}