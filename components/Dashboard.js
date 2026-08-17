"use client"
import React, { useState, useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { updateProfile } from '@/actions/route'
import { GetUser } from '@/actions/route'
import { ToastContainer, toast, Bounce } from 'react-toastify';


const Dashboard = () => {

    const [form, setform] = useState({})
    const { data: session, status, update } = useSession()
    const router = useRouter();
    

    const getData = async () => {
        let u = await GetUser(session.user.email)
        setform(u)
    }
    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/login");
        }
        if (status === "authenticated") {
            getData()
        }
    }, [status, router]);
    
    if (status === "loading" || status === "unauthenticated") {
        return <p>Loading...</p>;
        }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        let user = await GetUser(session.user.email)
        await updateProfile(e, user.username)
        await update()
        toast('Profile updated', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            })
    }


    return (
        <>
        <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
              />
        <section className="min-h-screen flex items-center justify-center px-4 py-10 bg-transparent text-white">
            <div className="w-full max-w-2xl rounded-3xl p-8 shadow-xl">
                <h1 className="text-3xl font-semibold text-center w-full mb-10">Welcome to Your Dashboard</h1>
                <form action={handleSubmit} className="flex flex-col gap-6 justify-center">
                    <ul className="flex flex-col gap-4">
                        <li className='w-full'>
                            <label htmlFor='name' className="text-sm font-medium mb-3 block">
                                Name
                            </label>
                            <input
                                type="text"
                                onChange={handleChange}
                                value={form.name ? form.name : ""}
                                name="name"
                                id='name'
                                placeholder="Enter your name"
                                className="rounded-2xl w-full border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                            />
                        </li>
                        <li className='w-full'>

                            <label htmlFor='email' className="text-sm font-medium mb-3 block">
                                Email
                            </label>
                            <input
                                type="email"
                                onChange={handleChange}
                                value={form.email ? form.email : ""}
                                name="email"
                                id='email'
                                required
                                placeholder="Enter your email"
                                className="rounded-2xl w-full border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                            />
                        </li>
                        <li className='w-full'>

                            <label htmlFor='username' className="text-sm font-medium mb-3 block">
                                Username
                            </label>
                            <input
                                type="text"
                                onChange={handleChange}
                                value={form.username ? form.username : ""}
                                name="username"
                                id='username'
                                required
                                placeholder="Choose a username"
                                className="rounded-2xl w-full border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                            />
                        </li>
                        <li className='w-full'>

                            <label htmlFor='profilePicture' className="text-sm font-medium mb-3 block">
                                Profile picture
                            </label>
                            <div className="flex items-center relative justify-between rounded-2xl border border-slate-700 bg-slate-800 px-4 py-1">
                                <input onChange={handleChange} value={form.profilePicture ? form.profilePicture : ""} type='text' id='profilePicture' name='profilePicture' placeholder='Choose file or paste link' className="text-slate-100 h-10 outline-0 text-sm w-full" />
                                
                            </div>
                            
                        </li>
                        <li className='w-full'>

                            <label htmlFor='coverPicture' className="text-sm font-medium mb-3 block">
                                Cover picture
                            </label>
                            <div className="flex items-center relative justify-between rounded-2xl border border-slate-700 bg-slate-800 px-4 py-1">
                                <input onChange={handleChange} value={form.coverPicture ? form.coverPicture : ""} type='text' name='coverPicture' id='coverPicture' placeholder='Choose file or paste link' className="text-slate-100 h-10 outline-0 text-sm w-full" />
                                
                            </div>
                            
                        </li>
                        <li className='w-full'>

                            <label htmlFor='password' className="text-sm font-medium mb-3 block">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={form.password ? form.password : ""}
                                onChange={handleChange}
                                id='password'
                                required
                                placeholder="Enter a password"
                                className="rounded-2xl w-full border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                            />
                        </li>

                        <li className='w-full'>
                            <label htmlFor='paymentId' className="text-sm font-medium mb-3 block">
                                Payment ID (Safepay)
                            </label>
                            <input value={form.paymentId ? form.paymentId : ''} onChange={handleChange}
                                type="password"
                                name="paymentId"
                                id='paymentId'
                                placeholder="Enter your payment ID"
                                className="rounded-2xl w-full border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                            />
                        </li>
                        <li className='w-full'>
                            <label htmlFor='paymentSecretApi' className="text-sm font-medium mb-3 block">
                                Payment Api Secret (Safepay)
                            </label>
                            <input value={form.paymentSecretApi ? form.paymentSecretApi : ''} onChange={handleChange}
                                type="password"
                                name="paymentSecretApi"
                                id='paymentSecretApi'
                                placeholder="Enter your payment secret code"
                                className="rounded-2xl w-full border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                            />
                        </li>
                        <li className='w-full'>
                            <label htmlFor='paymentSecret' className="text-sm font-medium mb-3 block">
                                Payment Secret Code (Safepay)
                            </label>
                            <input value={form.paymentSecret ? form.paymentSecret : ''} onChange={handleChange}
                                type="password"
                                name="paymentSecret"
                                id='paymentSecret'
                                placeholder="Enter your payment secret code"
                                className="rounded-2xl w-full border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                            />
                        </li>

                        <button
                            type="submit"
                            className="mt-2 rounded-2xl bg-linear-to-r cursor-pointer from-purple-600 to-blue-500 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                        >
                            Save changes
                        </button>
                    </ul>
                </form>
            </div>
        </section>
        </>
    )
}

export default Dashboard


