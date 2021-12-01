import { useRouter } from 'next/dist/client/router'
import { signIn } from '../firebase/initFirebase'
import { Alert, Button, TextField } from '@mui/material'
import React, { useState } from 'react'

const ErrorAlert = ({ error } : { error : string}) => {
    return (
        <Alert variant="filled" severity="error" style={{ marginBottom: 20 }}>
            {error}
        </Alert>
    )
}

const SuccessAlert = ({ alert } : { alert: string }) => {
    return (
        <Alert variant="filled" severity="success" style={{ marginBottom: 20 }}>
            {alert}, redirecting to &quot;HOME&quot;
        </Alert>
    )
}

const LoginForm = () => {
    const [error, setError] = useState('')
    const [successAlert, setSuccessAlert] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleSubmit = async (event : React.FormEvent) => {
        event.preventDefault()
        try{
            await signIn(email, password)
            setSuccessAlert("Authentication successful")
            setTimeout(() => {
                setSuccessAlert('')
                router.push('/')
            }, 2000)

        } catch (error : any) {
            setError(error.message)
            setTimeout(() => {
                setError('')
            },5000)
        }
    }

    return (
        <div>
            {error == ''
                ? null
                : <ErrorAlert error={error}/>
            }
            {successAlert == ''
                ? null
                : <SuccessAlert alert={successAlert}/>
            }
            <form onSubmit={handleSubmit}>
                <TextField
                    required
                    id="outlined-required"
                    label="Email"
                    type="email"
                    onChange={(event) => setEmail(event.target.value)}
                    size="small"
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Password"
                    type="password"
                    onChange={(event) => setPassword(event.target.value)}
                    size="small"
                />
                <Button type="submit" variant="contained" size="medium" style={{ textAlign: 'center', paddingTop: 9}}>
                    Log in
                </Button>
            </form>
        </div>
    )
}

export default LoginForm