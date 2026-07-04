import productModel from "../models/productModel.ts";


export const getAllProducts = async () => {

    return await productModel.find()
}

export const seedInitialProducts = async () => {

    try {
        
        const Initproducts = [

            { 
                title: "MSI Laptop", 
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfGlR2muWNqaWuz3HCsBbKFoRmStCFi0trbTlHjWemlLBynLbyy6YmGtw&s=10", 
                price: 1000, 
                stock: 4
            },
            { 
                title: "Dell Laptop", 
                image: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/dell/16250/media-gallery/cloud-plastic/non-fpr/notebook-dc16250-nt-ice-blue-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&hei=804&wid=1087&qlt=100,1&resMode=sharp2&size=1087,804&chrss=full", 
                price: 800, 
                stock: 6
            },
            { 
                title: "Asus Laptop", 
                image: "https://store.alnabaa.com/cdn/shop/files/dlcdnwebimgs.asus_39f601e4-777e-4c82-bb79-84279faa61d6.png?v=1761672527&width=2400", 
                price: 500, 
                stock: 9
            }
        ]
    
        const products = await getAllProducts()
    
        if (products.length === 0) {
    
            await productModel.insertMany(Initproducts)
        }

    } catch (err) {
        
        console.error("Cannot See Database", err)
    }

}