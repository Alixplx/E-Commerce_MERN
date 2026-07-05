import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { useRef, useState } from "react"
import { BASE_URL } from "../Constants/Constants"
import { useAuth } from "../context/AuthContext"



const RegisterPage = () => {

    const [error, setError] = useState("")

    const firstNameRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const { login} = useAuth()

    const handleSubmit = async () => {

        const firstName = firstNameRef.current?.value
        const lastName = lastNameRef.current?.value
        const email = emailRef.current?.value
        const password = passwordRef.current?.value

        // Validate Form Data
        if (!firstName || !lastName || !email || !password) {

            setError("Check Submitted Form Data")
            return
        }

        // Make call to API To Create User
        const response = await fetch(`${BASE_URL}user/register`, {

            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstName , lastName, email, password})
        })

        if (!response.ok) {
            
            setError("Unable To Create User Acount")
            return
        }

        const token = await response.json()

        if (!token) {

            setError("Incorrect Token")
            return
        }

        login(email, token)
    }

    return (

        <Container>

            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 4 ,my: 4}}>

                <Typography variant="h5">Regsiter New Account</Typography>

                <Box sx={{display: "flex", flexDirection: "column", gap: 4 ,p: 2}}>

                    <TextField inputRef={firstNameRef} label="Full Name" name="firstName" />
                    <TextField inputRef={lastNameRef} label="Full Name" name="lastName" />
                    <TextField inputRef={emailRef} label="Email" name="email" type="email" />
                    <TextField inputRef={passwordRef} label="Password" name="password" type="password" />
                    <Button onClick={handleSubmit} variant="contained">Regsiter</Button>

                    {
                        error && <Typography sx={{color: "red"}}>{error}</Typography>
                    }
                </Box>

            </Box>

        </Container>
    )
}


export default RegisterPage