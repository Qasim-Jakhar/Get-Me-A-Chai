import { NextResponse } from "next/server";
import safepay from "@sfpy/node-core";
import { GetUser } from "@/actions/route";


const client = safepay(process.env.SAFEPAY_SECRET, {
    authType: "secret",
    host: "https://sandbox.api.getsafepay.com",
});



export async function POST(request) {
    try {
        const body = await request.json()
        const amount = Number(body.amount)
        const name = body.name
        const email = body.email
        const user = await GetUser(email)
        const description = body.desc+`?${user.paymentSecret}`

        const payment = await client.payments.session.setup({
            merchant_api_key: process.env.SAFEPAY_API_KEY,
            intent: "CYBERSOURCE",
            mode: "payment",
            entry_mode: "raw",
            currency: "PKR",
            amount: amount,
            metadata: {
                order_id: name,
                source: description
            },
            include_fees: false,
        });


        const tracker = payment.data.tracker.token

        const tokenResponse = await fetch(
            "https://sandbox.api.getsafepay.com/client/passport/v1/token",
            {
                method: "POST",
                headers: {
                    "X-SFPY-MERCHANT-SECRET": process.env.SAFEPAY_SECRET,
                    "Content-Type": "application/json",
                },
            }
        );

        if (!tokenResponse.ok) {
            throw new Error(await tokenResponse.text());
        }

        const authResponse = await tokenResponse.json();

        const authenticationToken = authResponse.data;



        const checkoutURL = safepay.checkout.createCheckoutUrl({
            tracker: tracker,
            tbt: authenticationToken,
            environment: "sandbox",
            source: "hosted",
            redirect_url: `${process.env.NEXTAUTH_URL}/${user.name}/`,
            cancel_url: `${process.env.NEXTAUTH_URL}/${user.name}/`,
        });
        let url = `https://sandbox.api.getsafepay.com/embedded/?${String(checkoutURL).split("?")[1]}`
        
        return NextResponse.json({
            success: true,
            tracker,
            url
        })

    } catch (error) {
        console.error("Payment Creation Error: ", error)

        return NextResponse.json(
            {
                success: false,
                error: "Could not create payment",
            },
            { status: 500 }
        );

    }
}