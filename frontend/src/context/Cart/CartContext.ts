import { createContext, useContext } from "react";
import type { Cartitem } from "../../types/Cartitem";


interface CartContextType {

    cartItems: Cartitem[]
    totalAmount: number
    addItemToCart: (productId: string) => void
}

export const CartContext = createContext<CartContextType>({

    cartItems: [],
    totalAmount: 0,
    addItemToCart: () => {}
})

export const useCart = () => useContext(CartContext)