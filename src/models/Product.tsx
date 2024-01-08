export interface Product {
    id: number;
    image: string;
    title: string;
    price: number;
    isWishlisted?: boolean;
}

export interface CartProduct extends Product {
    quantity: number;
    totalItemPrice: number;
}

export interface CartState {
    items: CartProduct[];
    totalCartPrice: number;
    totalCartQuantity: number;
}

export interface WishlistState {
    items: Product[];
    totalItemsQuantity: number;
    totalPrice: number;
}
