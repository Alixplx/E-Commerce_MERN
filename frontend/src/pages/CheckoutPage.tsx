import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Button from '@mui/material/Button'
import { useCart } from "../context/Cart/CartContext"
import Box from "@mui/material/Box"
import { TextField } from "@mui/material"
import { useRef } from "react"
import { BASE_URL } from "../Constants/Constants"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/Auth/AuthContext"


const CheckoutPage = () => {

    const { cartItems, totalAmount} = useCart()

    const { token} = useAuth()

    const addressRef = useRef<HTMLInputElement>(null)

    const navigate = useNavigate()

    const handleConfirmOrder = async () => {

        const address = addressRef.current?.value
        
        if (!address) return

        const response = await fetch(`${BASE_URL}cart/checkout`, {

            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({address})
        })

        if (!response.ok) {

            return
        }

        navigate("/order-success")
    }

    return (

        <Container fixed sx={{ mt: 2}}>

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", my: 2}}>

                <Typography variant="h4">Checkout</Typography>
            </Box>

            <TextField inputRef={addressRef} label="Delivery Address" name="address" fullWidth sx={{ my: 3}} />
            
            <Box sx={{ gap: 2, display: "flex", flexDirection: "column", border: 1 ,borderColor: "#f5f5f5", borderRadius: 5 ,p: 2}}>

                {
                    cartItems.map((item) => (

                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center"}} key={item.productId}>

                            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2, width: "100%"}}>

                                <img src={item.image} width={50} />
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%"}}>

                                    <Typography variant="h5">{item.title}</Typography>
                                    <Typography>{item.quantity} x {item.unitPrice} IQ</Typography>
                                </Box>
                            </Box>
                        </Box>
                    ))
                }

                <Box>

                    <Typography sx={{ textAlign: "center"}} variant="h5">Total : {totalAmount.toFixed(2)} IQ</Typography>
                </Box>
            </Box>

            <Button variant="contained" sx={{ mt: 6}} fullWidth onClick={handleConfirmOrder}>Pay Now</Button>
        </Container>
    )
}


export default CheckoutPage