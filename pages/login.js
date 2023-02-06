import Link from 'next/link';
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
        <div className='h-screen w-screen p-4 flex flex-col justify-center items-center'>
            <h3 className="my-4 text-2xl font-semibold text-gray-700">Account Login</h3>
            <form className='mx-auto max-w-screen-md space-y-5' onSubmit={handleSubmit(submitHandler)}>
                <div>
                    <label htmlFor='email' className='mb-2 text-sm font-semibold text-gray-500'>Email</label>
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
                    <div class="flex justify-between">
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
                        className="w-4 h-4 transition duration-300 rounded-md"
                    />
                    <label for="remember" className="text-sm font-semibold text-gray-500">Remember me</label>
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
                                    aria-hidden="true"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                                    ></path>
                                </svg>
                            </span>
                            <span className="text-sm font-medium text-gray-800">Google</span>
                        </a>
                    </div>
                </div>
          </form>
        </div>
    )
}

export default LoginSceen