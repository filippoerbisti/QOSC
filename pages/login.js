import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { getError } from '../utils/error';
import { useRouter } from 'next/router';

const LoginSceen = () => {

    const { data: session } = useSession();

    const router = useRouter();
    const { redirect } = router.query;

    useEffect(() => {
        if (session?.user) {
            router.push('/tabs/home');
        }
    }, [router, session, redirect]);

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const submitHandler = async ({ email, password }) => {
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });
            if (result.error) {
                console.log(result.error);
            }
        } catch (err) {
            console.log(getError(err));
        }
    };

    // TODO:
    // ADD TOAST IN LOGIN ERROR
    // FIX BOX SHADOW

    return (
        <div className='h-screen w-screen p-4 flex flex-col justify-center items-center bg-stone-300'>
            <div className=' py-8 px-11 rounded-xl shadow-md bg-stone-200 shadow-stone-400'>
                <h1 className="mb-4 text-3xl font-semibold text-gray-700 text-center underline cursor-pointer">QOSC</h1>
                <h3 className="text-xl text-center font-semibold text-gray-700">Login</h3>
                <form className='mx-auto max-w-screen-md space-y-5' onSubmit={handleSubmit(submitHandler)}>
                    <div>
                        <div className='mb-1'>
                        <label htmlFor='email' className='text-sm font-semibold text-gray-500'>Email</label>
                        </div>
                        <input
                            type="email"
                            {...register('email', {
                                required: 'Please enter email',
                                pattern: {
                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                                    message: 'Please enter valid email',
                                },
                            })}
                            className="w-full rounded-md"
                            id="email"
                        ></input>
                        {errors.email && (
                            <div className="text-red-500">{errors.email.message}</div>
                        )}
                    </div>
                    <div>
                        <div class="flex justify-between mb-1">
                            <label htmlFor="password" class="text-sm font-semibold text-gray-500">Password</label>
                            <a href="#" class="text-sm text-blue-600 hover:underline">Forgot Password?</a>
                        </div>
                        <input
                            type="password"
                            {...register('password', {
                                required: 'Please enter password',
                                minLength: { value: 6, message: 'password is more than 5 chars' },
                            })}
                            className="w-full rounded-md"
                            id="password"
                        ></input>
                        {errors.password && (
                            <div className="text-red-500 ">{errors.password.message}</div>
                        )}
                    </div>
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="remember"
                            className="w-4 h-4 transition duration-300 rounded-md cursor-pointer"
                        />
                        <label for="remember" className="text-sm font-semibold text-gray-500 cursor-pointer">Remember me</label>
                    </div>
                    <div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow"
                    >
                        Log in
                    </button>
                    </div>
                    <div className="flex flex-col space-y-5">
                        <span className="flex items-center justify-center space-x-2">
                            <span className="h-px bg-gray-400 w-14"></span>
                            <span className="font-normal text-gray-500">or login with</span>
                            <span className="h-px bg-gray-400 w-14"></span>
                        </span>
                        <div>
                            <a
                                href="#"
                                className="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-gray-800 rounded-md"
                            >
                                <span>
                                    <svg 
                                        className="w-5 h-5 text-gray-800 fill-current"
                                        viewBox="0 0 16 16"
                                        version="1.1"
                                        aria-hidden="true"> 
                                        <path 
                                            d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"
                                        /> 
                                    </svg> 
                                </span>
                                <span className="text-sm font-medium text-gray-800">Google</span>
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginSceen