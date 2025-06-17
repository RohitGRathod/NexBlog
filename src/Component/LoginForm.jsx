import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as StoreLogin } from '../App/Service';
import authservice from '../Appwrite/auth';
import Input from './Input';
import {LogoWhite} from './index';

function LoginForm() {
    const { register, handleSubmit } = useForm();
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logintoAcc = async (data) => {
        setErrors('');
        try {
            const session = await authservice.login(data);
            if (session) {
                const userData = await authservice.getAccount();
                if (userData) dispatch(StoreLogin(userData));
                navigate('/');
            }
        } catch (error) {
            setErrors(error.message);
        }
    };

    return (
        <div
            className='flex items-center justify-center w-full'
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <LogoWhite width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-black/60 text-2xl font-bold leading-tight ">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-blue-600">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {errors && <p className="text-red-600 mt-8 text-center">{errors}</p>}
                <form onSubmit={handleSubmit(logintoAcc)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />

                        <button
                            type="submit"
                            className="w-full mt-4"
                            style={{ marginTop: '1rem' }}
                        >Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;