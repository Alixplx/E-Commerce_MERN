import { createContext, useContext } from "react";
import type { Cartitem } from "../../types/Cartitem";


interface CartContextType {

    cartItems: Cartitem[]
    totalAmount: number
    addItemToCart: (productId: string) => void
    updatedItemInCart: (productId: string, quantity: number) => void
}

export const CartContext = createContext<CartContextType>({

    cartItems: [],
    totalAmount: 0,
    addItemToCart: () => {},
    updatedItemInCart: () => {}
})

export const useCart = () => useContext(CartContext)