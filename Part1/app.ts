/* 
 * Author: Hao Wang
 * Student ID: 24832782
 * Assignment: PROG2005 Assessment 2 - Part 1
 * Description: TypeScript Inventory Management System (No Server)
 */

// 1. Enums & Interfaces (HD Standard: Strict Typing)
enum Category {
    Electronics = "Electronics",
    Furniture = "Furniture",
    Clothing = "Clothing",
    Tools = "Tools",
    Miscellaneous = "Miscellaneous"
}

enum StockStatus {
    InStock = "In Stock",
    LowStock = "Low Stock",
    OutOfStock = "Out of Stock"
}

interface Item {
    id: string;
    name: string;
    category: Category;
    quantity: number;
    price: number;
    supplier: string;
    stockStatus: StockStatus;
    isPopular: boolean;
    comment?: string;
}

// 2. Data Storage (Session-based array)
let inventory: Item[] = [];

// 3. UI/UX: Custom Notification System (HD Requirement: NO alert() allowed)
function showNotification(message: string, type: 'success' | 'error' | 'warning' = 'success', persist: boolean = false): void {
    const notifArea = document.getElementById("notification-area") as HTMLDivElement;
    notifArea.innerHTML = `<div class="toast toast-${type}">${message}</div>`;
    
    if (!persist) {
        setTimeout(() => { notifArea.innerHTML = ""; }, 3000);
    }
}

// 4. Core CRUD Functions
function getFormValues(): Item | null {
    const id = (document.getElementById("itemId") as HTMLInputElement).value.trim();
    const name = (document.getElementById("itemName") as HTMLInputElement).value.trim();
    const category = (document.getElementById("itemCategory") as HTMLSelectElement).value as Category;
    const quantity = parseInt((document.getElementById("itemQty") as HTMLInputElement).value);
    const price = parseFloat((document.getElementById("itemPrice") as HTMLInputElement).value);
    const supplier = (document.getElementById("itemSupplier") as HTMLInputElement).value.trim();
    const stockStatus = (document.getElementById("itemStatus") as HTMLSelectElement).value as StockStatus;
    const isPopular = (document.getElementById("itemPopular") as HTMLSelectElement).value === "true";
    const comment = (document.getElementById("itemComment") as HTMLInputElement).value.trim();

    // Data Validation
    if (!id || !name || isNaN(quantity) || isNaN(price) || !supplier) {
        showNotification("All fields except comment are required, and numbers must be valid!", "error");
        return null;
    }
    if (quantity < 0 || price < 0) {
        showNotification("Quantity and Price cannot be negative!", "error");
        return null;
    }

    return { id, name, category, quantity, price, supplier, stockStatus, isPopular, comment };
}

// Add Item
function addItem(): void {
    const newItem = getFormValues();
    if (!newItem) return;

    // Check Unique ID and Name
    if (inventory.some(item => item.id === newItem.id)) {
        showNotification("Error: Item ID must be unique!", "error");
        return;
    }
    if (inventory.some(item => item.name === newItem.name)) {
        showNotification("Error: Item Name must be unique!", "error");
        return;
    }

    inventory.push(newItem);
    showNotification(`Item "${newItem.name}" added successfully!`, "success");
    displayItems(inventory);
    (document.getElementById("inventory-form") as HTMLFormElement).reset();
}

// Update Item by Name (Required by Assignment Brief)
function updateItem(): void {
    const formItem = getFormValues();
    if (!formItem) return;

    const index = inventory.findIndex(item => item.name === formItem.name);
    if (index === -1) {
        showNotification(`Item with name "${formItem.name}" not found!`, "error");
        return;
    }

    // Retain original ID, update other fields
    formItem.id = inventory[index].id; 
    inventory[index] = formItem;
    showNotification(`Item "${formItem.name}" updated successfully!`, "success");
    displayItems(inventory);
}

// Delete Item by Name with Confirmation
function deleteConfirmation(): void {
    const searchName = (document.getElementById("searchBar") as HTMLInputElement).value.trim();
    if (!searchName) {
        showNotification("Please enter a name in the search bar to delete.", "error");
        return;
    }

    const itemExists = inventory.some(item => item.name === searchName);
    if (!itemExists) {
        showNotification(`Item "${searchName}" not found!`, "error");
        return;
    }

    // Dynamic innerHTML for confirmation (No alert/confirm window)
    const notifArea = document.getElementById("notification-area") as HTMLDivElement;
    notifArea.innerHTML = `
        <div class="toast toast-warning">
            <p>Are you sure you want to delete "${searchName}"?</p>
            <button onclick="executeDelete('${searchName}')" class="btn-danger">Yes, Delete</button>
            <button onclick="cancelAction()" class="btn-secondary">Cancel</button>
        </div>
    `;
}

function executeDelete(name: string): void {
    inventory = inventory.filter(item => item.name !== name);
    showNotification(`Item "${name}" deleted.`, "success");
    displayItems(inventory);
}

function cancelAction(): void {
    const notifArea = document.getElementById("notification-area") as HTMLDivElement;
    notifArea.innerHTML = "";
}

// Search and Display
function searchItem(): void {
    const searchName = (document.getElementById("searchBar") as HTMLInputElement).value.trim().toLowerCase();
    const results = inventory.filter(item => item.name.toLowerCase().includes(searchName));
    displayItems(results);
    if(results.length === 0) showNotification("No items found.", "warning");
}

function displayPopularItems(): void {
    const popularItems = inventory.filter(item => item.isPopular);
    displayItems(popularItems);
}

function displayItems(itemsToDisplay: Item[]): void {
    const displayArea = document.getElementById("inventory-list") as HTMLDivElement;
    if (itemsToDisplay.length === 0) {
        displayArea.innerHTML = "<p>No items in database.</p>";
        return;
    }

    let html = `<table><tr>
        <th>ID</th><th>Name</th><th>Category</th><th>Qty</th><th>Price</th>
        <th>Supplier</th><th>Status</th><th>Popular</th><th>Comment</th>
    </tr>`;
    
    itemsToDisplay.forEach(item => {
        html += `<tr>
            <td>${item.id}</td><td>${item.name}</td><td>${item.category}</td>
            <td>${item.quantity}</td><td>$${item.price.toFixed(2)}</td>
            <td>${item.supplier}</td><td>${item.stockStatus}</td>
            <td>${item.isPopular ? 'Yes' : 'No'}</td><td>${item.comment || '-'}</td>
        </tr>`;
    });
    html += `</table>`;
    displayArea.innerHTML = html;
}