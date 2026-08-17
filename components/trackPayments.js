"use client"

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { fetchUser } from '@/actions/route';
import { GetUser } from '@/actions/route';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useSearchParams } from 'next/navigation';



const Track = ({ username }) => {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [form, setForm] = useState({ name: "", description: "", amount: "" })
  const [user, setUser] = useState([])
  const [payment, setPayment] = useState([])
  const searchParams = useSearchParams()



  async function handlePayment(amount, name, desc) {
    const response = await fetch("/Payments/PaymentSession", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount,
        name: `${name}?${username}`,
        desc: desc,
        email: session.user.email
      }),
    });


    const data = await response.json();
    if (!data.success) {
      console.error("Payment creation failed");
      return;
    }
    // Redirect to the Safepay checkout URL
    window.location.href = data.url;
  }


  const getData = async () => {
    let u = await GetUser(session.user.email)
    setUser(u)
    let data = await fetchUser()
    setPayment(data)
  }
  

  useEffect(() => {
    const tracker = searchParams.get("tracker");
    if (!tracker) return;

    let attempts = 0;
    const tryToast = () => {
      const containerExists = document.querySelector('.Toastify__toast-container');
      console.log(attempts)
      if (containerExists || attempts > 60) {
        toast('Payment is successful', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        router.replace(`/${username}`)
      } else {
        attempts++;
        requestAnimationFrame(tryToast);
      }
    };
    requestAnimationFrame(tryToast);
  }, []);

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

  
  const pay = async (amount) => {

    if (form.name.length < 3 || form.description.length < 5) {
      alert("Either of Name, Message and Amount has invalid value")
      return
    }
    // const price = await getValuesFromUser({name: form.name, description: form.description, amount: amount})

    // setForm({ name: "", description: "", amount: "" })
    let payAmount = amount * 100
    handlePayment(payAmount, form.name, form.description)
  }



  const handleChange = (e) => {
    const updated = { ...form, [e.target.name]: e.target.value }
    setForm(updated)
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
      <div className="cover w-full relative">
        <img className='w-full object-cover' src={user.coverPicture} alt="" />

        <div className="profilePic absolute md:-bottom-20 -bottom-18 md:right-[43%] right-[39%] border-2 border-white overflow-hidden rounded-full">
          <img width={150} height={150} className='md:w-42 w-24' src={user.profilePicture} alt="" />
        </div>
      </div>
      <div className="info my-24 flex justify-center flex-col gap-2 items-center">
        <h1 className="text-2xl font-bold">@{username.replace("%20", " ")}</h1>
        <p className='text-slate-300'>
          Let's help {username.replace("%20", " ")} get a Chai
        </p>
        <p className='text-slate-300'>
          {payment.length} Payments . Rs. {payment.reduce((a, b) => a + b.amount, 0)} raised
        </p>


        <div className="supporter mt-9 flex md:flex-nowrap flex-wrap gap-4 md:w-[80%] w-[90%]">
          <div className="supporters md:w-1/2 w-full bg-slate-900 rounded-lg py-3 px-7">
            {/* Show the list of all supporters as leaderboard */}
            <h2 className="my-3 mb-6 font-semibold text-2xl">Top Supporters</h2>
            <ul className='pl-2  flex flex-col gap-2 '>
              {payment.length === 0 && <div>No payments yet</div>}
              {payment.slice(0, 6).map((p, i) => {

                return <li key={i} className='my-2 flex gap-4 items-center'>
                  <img width={33} src="avatar.gif" alt="user avatar" />
                  <span className=''>
                    {p.name} paid
                    <span className="mx-1 font-bold">Rs.{p.amount}</span> to {p.paidTo + " "}
                    with a message "{p.description}❤️"
                  </span>
                </li>

              })}
            </ul>

          </div>

          <div className="makePayment md:w-1/2 w-full bg-slate-900 rounded-lg py-3 px-7">
            <div className="flex flex-col my-3 mb-5">
              <h2 className="text-2xl font-semibold my-3 mb-2 ">Make a Payment
              </h2>
              <div className='flex flex-col gap-0.5 ml-2 text-[0.75rem] text-blue-400 '><p>Name: <span className='text-slate-400'>Minimum 3 characters</span></p>  <p>Description: <span className='text-slate-400'>Minimum 5 characters</span> </p> <p>Amount: <span className='text-slate-400'>Greater than zero</span></p></div>
            </div>
            <div className="flex gap-2 flex-col">
              {/* input for name and message */}
              <input type="text" value={form.name} onChange={handleChange} name='name' placeholder='Enter Name' className='bg-slate-800 rounded-lg py-2 px-3 w-full' />
              <input type="text" value={form.description} onChange={handleChange} name='description' placeholder='Enter Message' className='bg-slate-800 rounded-lg py-2 px-3 w-full' />
              <input type="number" value={form.amount} onChange={handleChange} name='amount' placeholder='Enter Amount' className='bg-slate-800 rounded-lg py-2 px-3 w-full' />
              <button onClick={() => pay(form.amount)} type="button" className="w-full px-6 py-2 hover:bg-linear-to-bl focus:ring-1 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-400 font-medium rounded-lg text-md text-center leading-5 text-white bg-linear-to-br cursor-pointer flex justify-center items-center from-blue-900 disabled:from-slate-700 disabled:to-gray-700 to-purple-900 border-2 border-violet-950  h-10" disabled={form.name?.length < 3 || form.description?.length < 5 || form.amount <= 0 || form.amount == ""}>Pay</button>
            </div>
            <h4 className='my-6 flex flex-col gap-1'>OR choose from these amounts:
              <span className='ml-3 md:text-[0.75rem] text-sm text-blue-400'>(Name and Message are necessary)</span>
            </h4>
            <div className="md:flex md:gap-2 md:flex-wrap grid place-items-center grid-cols-4 gap-x-5 gap-y-3 mt-4">
              <button onClick={() => pay(50)} type="button" className="text-white bg-linear-to-br cursor-pointer from-gray-700 to-blue-900 border border-violet-600 hover:bg-linear-to-bl focus:ring-1 focus:outline-none  focus:ring-purple-200 dark:focus:ring-purple-400 font-medium rounded-lg md:text-sm text-[0.75rem] md:px-6 md:py-2 px-1 py-1 text-center leading-5 md:max-w-max max-w-25 min-w-20">Pay Rs.50</button>
              <button onClick={() => pay(100)} type="button" className="text-white bg-linear-to-br cursor-pointer from-gray-700 to-blue-900 border border-violet-600 hover:bg-linear-to-bl focus:ring-1 focus:outline-none  focus:ring-purple-200 dark:focus:ring-purple-400 font-medium rounded-lg md:text-sm text-[0.75rem] md:px-6 md:py-2 px-1 py-1 text-center leading-5 md:max-w-max max-w-25 min-w-20">Pay Rs.100</button>
              <button onClick={() => pay(200)} type="button" className="text-white bg-linear-to-br cursor-pointer from-gray-700 to-blue-900 border border-violet-600 hover:bg-linear-to-bl focus:ring-1 focus:outline-none  focus:ring-purple-200 dark:focus:ring-purple-400 font-medium rounded-lg md:text-sm text-[0.75rem] md:px-6 md:py-2 px-1 py-1 text-center leading-5 md:max-w-max max-w-25 min-w-20">Pay Rs.200</button>
              <button onClick={() => pay(500)} type="button" className="text-white bg-linear-to-br cursor-pointer from-gray-700 to-blue-900 border border-violet-600 hover:bg-linear-to-bl focus:ring-1 focus:outline-none  focus:ring-purple-200 dark:focus:ring-purple-400 font-medium rounded-lg md:text-sm text-[0.75rem] md:px-6 md:py-2 px-1 py-1 text-center leading-5 md:max-w-max max-w-25 min-w-20">Pay Rs.500</button>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Track

