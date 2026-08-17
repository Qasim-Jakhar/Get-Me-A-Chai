"use client"
import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";



export default function PaymentSuccessPage() {
  const { data: session, status } = useSession()
  const searchParams = useSearchParams()


   if (status === "loading") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading...</p>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Please sign in.</p>
      </main>
    );
  }


  return (
    <main className="min-h-[80vh] flex items-center justify-center  px-4">
      <div className="w-full max-w-md rounded-2xl  p-8 text-center bg-slate-900 shadow-lg">
        
        <div className="mx-auto mb-6 flex h-20 w-20 items-center bg-slate-600 justify-center rounded-full ">
          <svg
            className="h-10 w-10 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-white">
          Payment Successful!
        </h1>

        <p className="mt-3 text-white">
          Your payment has been successfully processed.
        </p>

        <p className="mt-2 text-sm text-white">
          Thank you for your payment.
        </p>

        <Link
          href={`/${session.user.name}?tracker=${searchParams.get("tracker")}`}
          className="mt-8 inline-block rounded-lg bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300  dark:focus:ring-blue-800  px-6 py-3 font-semibold text-white transition hover:bg-green-700"
        >
          Back to Payment Page
        </Link>
      </div>
    </main>
  );
}