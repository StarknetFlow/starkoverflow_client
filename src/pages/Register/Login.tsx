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
import { previousDay } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { login } from '../../redux/authSlice';


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
const signInSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is a required field"),
    password: yup.string().min(8, "Must be at least 8 character").max(14, "Must be less than 14 character").required("This field is required"),
})


export default function SignIn() {

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const accessToken = useAppSelector(state => state.auth.accessToken)

    useEffect(() => {
        if (accessToken) navigate("/")
    }, [accessToken])

    const [errors, setErrors] = useState<{
        email: string,
        password: string
    }>({
        email: "",
        password: ""
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const submitAttemptData = {
            email: data.get('email'),
            password: data.get('password'),
        }
        try {
            const validatedData = await signInSchema.validate(submitAttemptData)
            if (validatedData) {
                setErrors({ email: "", password: "" });
                dispatch(login({
                    email: validatedData.email.toString(),
                    password: validatedData.password.toString()
                }))
            }
        } catch (validationErrors: any) {

            if (validationErrors.path === "password") setErrors({ ...errors, password: validationErrors.message })
            else if (validationErrors.path === "email") setErrors({ ...errors, email: validationErrors.message })


            console.log(validationErrors)
        }

    }

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault()
        if (e.target.value.includes("@")) setErrors({ ...errors, email: "" })
    }
    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault()
        if (e.target.value.length >= 8 && e.target.value.length <= 14) setErrors({ ...errors, password: "" })
    }


    return (
        <Container className='login-page-container' maxWidth="xs">
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
                    Sign In
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                        Sign In
                    </Button>
                    <Grid container className='mt-2 mb-1'>
                        <Grid item xs>
                            <Link href="#" variant="body2" className='signin-link ms-2'>
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/register" variant="body2" className='signin-link me-2'>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}