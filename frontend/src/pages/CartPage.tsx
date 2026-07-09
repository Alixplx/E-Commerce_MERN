import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import { useCart } from "../context/Cart/CartContext"
import Box from "@mui/material/Box"
import Delete from "@mui/icons-material/Delete"


const CartPage = () => {

    const { cartItems, totalAmount, updatedItemInCart, removeItemInCart} = useCart()    

    const handleQuantity = (productId: string, quantity: number) => {

        if (quantity < 1) return
        updatedItemInCart(productId, quantity)
    }

    const handleRemoveItem = (productId: string) => {

        removeItemInCart(productId)
    }

    return (

        <Container fixed sx={{ mt: 2}}>

            <Typography variant="h4" sx={{ my: 2}}>My Cart</Typography>
            
            <Box sx={{ gap: 4, display: "flex", flexDirection: "column"}}>

                {
                    cartItems.map((item) => (

                        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", border: 1, borderColor: "#f5f5f5", borderRadius: 5 ,p: 1}} key={item.productId}>

                            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2}}>

                                <img src={item.image} width={150} />
                                <Box>

                                    <Typography variant="h5">{item.title}</Typography>
                                    <Typography>{item.quantity} x {item.unitPrice} IQ</Typography>
                                    <Button onClick={() => handleRemoveItem(item.productId)}> <Delete sx={{ color: "red"}} /> </Button>
                                </Box>
                            </Box>

                            <ButtonGroup variant="contained" aria-label="Basic button group">

                                <Button onClick={() => handleQuantity(item.productId, item.quantity + 1)}>+</Button>
                                <Button onClick={() => handleQuantity(item.productId, item.quantity - 1)}>-</Button>
                            </ButtonGroup>
                        </Box>
                    ))
                }

                <Box>

                    <Typography variant="h4">Total : {totalAmount.toFixed(2)} IQ</Typography>
                </Box>

            </Box>
        </Container>
    )
}


export default CartPage