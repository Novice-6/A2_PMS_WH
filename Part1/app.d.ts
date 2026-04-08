declare enum Category {
    Electronics = "Electronics",
    Furniture = "Furniture",
    Clothing = "Clothing",
    Tools = "Tools",
    Miscellaneous = "Miscellaneous"
}
declare enum StockStatus {
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
declare let inventory: Item[];
declare function showNotification(message: string, type?: 'success' | 'error' | 'warning', persist?: boolean): void;
declare function getFormValues(): Item | null;
declare function addItem(): void;
declare function updateItem(): void;
declare function deleteConfirmation(): void;
declare function executeDelete(name: string): void;
declare function cancelAction(): void;
declare function searchItem(): void;
declare function displayPopularItems(): void;
declare function displayItems(itemsToDisplay: Item[]): void;
//# sourceMappingURL=app.d.ts.map