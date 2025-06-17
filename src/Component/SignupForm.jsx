import React, { useState } from 'react'
import { set, useForm } from 'react-hook-form'
import { useNavigate,Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../App/Service'
import authservice from '../Appwrite/auth'
import  Input  from './Input'
import {LogoWhite} from "./index"

function Signup() {
    const { register, handleSubmit } = useForm()
    const [errors, setErrors] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const signupToAcc = async (data) => {
        try {
            const session = await authservice.createAccount(data)
            if (session) {
                const userData = await authservice.getAccount()
                if (userData) dispatch(login(userData))
                navigate('/')
            }
            setErrors('')
        } catch (error) {
            setErrors(error.message)
        }
    }
    return (
        <div className="flex items-center justify-center w-full">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <LogoWhite width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl text-black/60 font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {errors && <p className="text-red-600 mt-8 text-center">{errors}</p>}
                <form onSubmit={handleSubmit(signupToAcc)}>
                    <div className='space-y-5'>
                        <Input
                            type="name"
                            label="Name"
                            placeholder="Enter your name"
                            {...register("name", {
                                required: true
                            })}
                        />
                        <Input
                            type="email"
                            label="Email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: true,
                                validate: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                            })}
                        />
                        <Input
                            type="password"
                            label="Password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true
                            })}
                        />
                        <button type="submit" style={{ marginTop: '1rem' }} className='w-full'>Sign Up</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Signup
