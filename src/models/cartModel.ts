import mongoose ,{ Schema, Document, type ObjectId} from "mongoose"
import type { IProduct } from "./productModel.ts"


const cartStatusEnum = ["active", "completed"]

export interface ICartitem {

    product: IProduct
    unitPrice: number
    quantity: number
}


export interface ICart extends Document {

    userId: ObjectId | string
    items: ICartitem[]
    totalAmount: number
    status: "active" | "completed"
}

const cartItemSchema = new Schema<ICartitem>({

    product: { type: Schema.Types.ObjectId, ref: "Product", required: true},
    quantity: { type: Number, required: true, default: 1},
    unitPrice: { type: Number, required: true}
})


const cartSchema = new Schema<ICart>({

    userId: { type: Schema.Types.ObjectId, ref: "User", required: true},
    items: [cartItemSchema],
    totalAmount: { type: Number, required: true},
    status: { type: String, enum: cartStatusEnum, default: "active"}
})


export const cartModel = mongoose.model<ICart>("Cart", cartSchema)