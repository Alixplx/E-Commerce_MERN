import { CheckCircleOutlined } from "@mui/icons-material"
import { Button } from "@mui/material"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import { useNavigate } from "react-router-dom"



const OrderSuccessPage = () => {

    const navigate = useNavigate()

    const handleHome = () => {

        navigate("/")
    }

    return (

        <Container fixed sx={{ mt: 2, display: "flex", gap: 2, flexDirection: "column" ,alignItems: "center", justifyContent: "center"}}>

            <CheckCircleOutlined sx={{ color: "green", fontSize: "80px"}} />
            <Typography variant="h4">Thanks For Your Order.</Typography>
            <Typography variant="h6">We Will Process it and Arrive You Soon</Typography>
            <Button variant="contained" onClick={handleHome}>Go Home</Button>
        </Container>
    )
}

export default OrderSuccessPage