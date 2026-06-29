import { cartModel, type ICartItem } from "../models/cartModel.ts"
import { orderModel, type IOrderItem } from "../models/orderModel.ts"
import productModel from "../models/productModel.ts"


interface createCartForUser {

    userId: string
}

const createCartForUser = async ({ userId}: createCartForUser) => {

    const cart = await cartModel.create({ userId, totalAmount: 0})
    await cart.save()
    return cart
}


interface getActiveCartForUser {

    userId: string
}

export const getActiveCartForUser = async ({ userId}: getActiveCartForUser) => {

    let cart = await cartModel.findOne({ userId, status: "active"})

    if (!cart) {

        cart = await createCartForUser({ userId})
    }

    return cart
}


interface AddItemToCart {

    productId: any
    quantity: number
    userId: string
}

export const addItemToCart = async ({ productId, quantity, userId}: AddItemToCart) => {

    const cart = await getActiveCartForUser({ userId})

    // Does the item exist in the cart?
    const existsInCart = cart.items.find((p) => p.product.toString() === productId)

    if (existsInCart) {

        return { data: "Item Already exists in cart!", statusCode: 400}
    }

    // Fetch The Product
    const product = await productModel.findById(productId)

    if (!product) {

        return { data : "Product Not Found!", statusCode: 400}
    }

    if (product.stock < quantity) {

        return { data: "Low Stock For Item", statusCode: 400}
    }

    cart.items.push({ product: productId, unitPrice: product.price, quantity})

    // Update The Totalamount For the cart
    cart.totalAmount += product.price * quantity

    const updatedCart = await cart.save()

    return { data: updatedCart, statusCode: 200}
}


interface UpdateItemInCart {

    productId: any
    quantity: number
    userId: string
}

export const updateItemInCart = async ({ productId, quantity, userId}: UpdateItemInCart) => {

    const cart = await getActiveCartForUser({ userId})

    // Does the item exist in the cart?
    const existsInCart = cart.items.find((p) => p.product.toString() === productId)

    if (!existsInCart) {

        return { data: "Item Does not exist in cart", statusCode: 400}
    }

    const product = await productModel.findById(productId)

    if (!product) {

        return { data : "Product Not Found!", statusCode: 400}
    }

    if (product.stock < quantity) {

        return { data: "Low Stock For Item", statusCode: 400}
    }

    const otherCartItems = cart.items.filter((p) => p.product.toString() !== productId)
    
    let total = calculateCartTotalItems({ cartItems: otherCartItems})
    
    existsInCart.quantity = quantity
    total += existsInCart.quantity * existsInCart.unitPrice

    cart.totalAmount = total

    const updatedCart = await cart.save()
    
    return { data: updatedCart, statusCode: 200}
}



interface DeleteItemFromCart {

    productId: any
    userId: string
}

export const deleteItemInCart = async ({ productId, userId}: DeleteItemFromCart) => {

    const cart = await getActiveCartForUser({ userId})

    // Does the item exist in the cart?
    const existsInCart = cart.items.find((p) => p.product.toString() === productId)

    if (!existsInCart) {

        return { data: "Item Does not exist in cart", statusCode: 400}
    }

    const otherCartItems = cart.items.filter((p) => p.product.toString() !== productId)

    let total = calculateCartTotalItems({ cartItems: otherCartItems})

    cart.items = otherCartItems
    cart.totalAmount = total

    const updatedCart = await cart.save()
    
    return { data: updatedCart, statusCode: 200}
}

interface ClearCart {

    userId: string
}

export const clearCart = async ({ userId}: ClearCart) => {

    const cart = await getActiveCartForUser({ userId})

    cart.items = []
    cart.totalAmount = 0

    const updatedCart = await cart.save()
    
    return { data: updatedCart, statusCode: 200}
}


const calculateCartTotalItems = ({ cartItems}: { cartItems: ICartItem[]}) => {

    let total = cartItems.reduce((sum, product) => {
        
        sum += product.quantity * product.unitPrice
        return sum
    }, 0)

    return total
}


interface ICheckout {

    userId: string
    address: string
}

export const checkout = async ({ userId, address}: ICheckout) => {

    if (!address) {

        return { data: "Please add the address", statusCode: 400}
    }

    const cart = await getActiveCartForUser({ userId})

    const orderItems: IOrderItem[] = []

    // Loop cartItems and create orderItems
    for (const item of cart.items) {

        const product = await productModel.findById(item.product)

        if (!product) {

            return { data : "Product Not Found!", statusCode: 400}
        }

        const orderItem: IOrderItem = {

            productTitle: product.title,
            productImage: product.image,
            quantity: item.quantity,
            unitPrice: item.unitPrice
        }

        orderItems.push(orderItem)
    }

    const order = await orderModel.create({

        orderItems,
        total: cart.totalAmount,
        address,
        userId
    })

    await order.save()

    // Update the cart status to be completed
    cart.status = "completed"
    await cart.save()
    
    return { data: order, statusCode: 200}
}