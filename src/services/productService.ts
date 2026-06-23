import productModel from "../models/productModel.ts";


export const getAllProducts = async () => {

    return await productModel.find()
}

export const seedInitialProducts = async () => {

    const Initproducts = [

        { 
            title: "MSI Laptop", 
            image: "https://www.pocket-lint.com/laptops/news/msi/144117-msi-unveils-new-line-of-gaming-laptops-including-the-world-s-first-intel-core-i9-powered-laptop/", 
            price: 1000, 
            stock: 4
        }
    ]

    const products = await getAllProducts()

    if (products.length === 0) {

        await productModel.insertMany(Initproducts)
    }

}