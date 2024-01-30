import * as React from 'react';
import { useState, useEffect } from 'react';
import "./styles.css"
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '../../styles/Typography'
import Container from '@mui/material/Container';
import * as yup from "yup"
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { createUser } from '../../redux/authSlice';
import { ICreateUserPayload } from '../../redux/types';
import { useNavigate } from 'react-router-dom';


function Copyright(props: any) {
    return (
        <Typography variant="subtitle1" color="blue" className='mt-2' styles={{ display: "flex", justifyContent: "center" }}>
            {'Copyright © '}
            <Link className='starkoverlow-link me-1' href="https://mui.com/">
                Starkoverlow
            </Link>
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const signUpSchema = yup.object().shape({

    username: yup.string().required("This field is required"),
    email: yup.string().email("Invalid email").required("Email is a required field"),
    password: yup.string().min(8, "Must be at least 8 characters").max(14, "Must be less then 14 characters").required(),
    passwordConfirmation: yup.string().oneOf([yup.ref('password')], "Passwords are not matching")

})


export default function SignIn() {

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const accessToken = useAppSelector(state => state.auth.accessToken)

    useEffect(() => {
        if (accessToken) navigate("/")
    }, [accessToken])

    const [errors, setErrors] = useState<{
        username: string,
        email: string,
        password: string,
        passwordConfirmation: string
    }>({
        username: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    });

    const [passwordForConfirm, setPasswordForConfirm] = useState<string>("")

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const submitAttemptData = {
            username: data.get("username"),
            email: data.get('email'),
            password: data.get('password'),
            passwordConfirmation: data.get("passwordConfirmation")
        }
        try {
            const validatedData = await signUpSchema.validate(submitAttemptData)
            if (validatedData) {
                setErrors({ email: "", password: "", username: "", passwordConfirmation: "" });
                alert("OK")
                const payload: ICreateUserPayload = {
                    display_name: submitAttemptData.username!.toString(),
                    email: submitAttemptData.email!.toString(),
                    password: submitAttemptData.password!.toString(),
                }
                dispatch(createUser(payload))

            }
        } catch (validationErrors: any) {
            console.log(validationErrors.path)
            if (validationErrors.path === "password") setErrors({ ...errors, password: validationErrors.message })
            else if (validationErrors.path === "email") setErrors({ ...errors, email: validationErrors.message })
            else if (validationErrors.path === "username") setErrors({ ...errors, username: validationErrors.message })
            else if (validationErrors.path === "passwordConfirmation") setErrors({ ...errors, passwordConfirmation: validationErrors.message })


        }
    }

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault()
        if (e.target.value.includes("@")) setErrors({ ...errors, email: "" })
    }
    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault()
        if (e.target.value.length >= 8 && e.target.value.length <= 14) {
            setErrors({ ...errors, password: "" })
            setPasswordForConfirm(e.target.value)
        }
    }
    const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault()
        if (e.target.value !== "") setErrors({ ...errors, username: "" })
    }
    const handleChangePasswordConfirmation = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault()
        if (e.target.value === passwordForConfirm) setErrors({ ...errors, passwordConfirmation: "" })
    }

    return (
        <Container className='login-page-container' maxWidth="xs" style={{ paddingTop: "120px" }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: '#0d0c4e' }}>
                    <i className="fa-solid fa-lock fa-sm"></i>
                </Avatar>
                <Typography variant="caption1" color="blue">
                    Sign Up
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        className='input-singin'
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        error={errors.username ? true : false}
                        helperText={errors.username && errors.username}
                        onChange={handleChangeUsername}
                    />
                    <TextField
                        className='input-singin'
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        error={errors.email ? true : false}
                        helperText={errors.email && errors.email}
                        onChange={handleChangeEmail}
                    />
                    <TextField
                        className='input'
                        style={{ borderRadius: "20px" }}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={errors.password ? true : false}
                        helperText={errors.password && errors.password}
                        onChange={handleChangePassword}
                    />
                    <TextField
                        className='input'
                        style={{ borderRadius: "20px" }}
                        margin="normal"
                        required
                        fullWidth
                        name="passwordConfirmation"
                        label="Password Again"
                        type="password"
                        id="passwordConfirmation"
                        autoComplete="current-password"
                        error={errors.passwordConfirmation ? true : false}
                        helperText={errors.passwordConfirmation && errors.passwordConfirmation}
                        onChange={handleChangePasswordConfirmation}
                    />
                    {/* <FormControlLabel
                        className='ms-'
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    /> */}
                    <Button
                        className='signin-btn'
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container className='my-2'>
                        <Grid item>
                            <Link href="/login" variant="body2" className='signin-link me-2' >
                                {"Already have an account? Sign in"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}