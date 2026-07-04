import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"
import ProductCard from "../Components/ProductCard"
import { useEffect, useState } from "react"
import type { Product } from "../types/Products"
import { Box } from "@mui/material"
import { BASE_URL } from "../Constants/Constants"


const HomePage = () => {

    const [products, setProducts] = useState<Product[]>([])
    const [error, setError] = useState(false)

    useEffect(() => {

        const fetchData = async () => {

            try {
                
                const response = await fetch(`${BASE_URL}product`)
                const data = await response.json()
                setProducts(data)

            } catch (error) {
                
                setError(true)
            }
        }

        fetchData()
        
    }, [])

    if (error) {

        return (

            <Box>Something Went Wrong, Please try again later!</Box>
        )
    }
    
    return (

        <Container sx={{ mt: 2, p: 2}}>

            <Grid container spacing={2}>

                {
                    products.map((product) => (

                        <Grid sx={{ xs: 12, md: 4}} key={product._id}>

                            <ProductCard {...product} />
                        </Grid>
                    ))
                }
            </Grid>
        </Container>
    )
}

export default HomePage