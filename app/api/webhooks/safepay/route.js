import crypto from "crypto";
import { NextResponse } from "next/server";
import Customer from "@/models/Customer";
import Payment from "@/models/Payment";
import connectDB from "@/db/ConnectDB";


export async function POST(request) {
    try {
        // Get the exact request body sent by Safepay
        const rawBody = await request.text();

        // Get Safepay's signature
        const signature = request.headers.get("X-SFPY-SIGNATURE");

        if (!signature) {
            return NextResponse.json({ message: "Missing signature" }, {
                status: 400,
            });
        }
       
        async function Data() {
            // Your Safepay Webhook Secret
            const userData = JSON.parse(rawBody).data
            let secret = userData.metadata?.source.split("?")[1];
            return secret
        }
        const secret = await Data()
        if (!secret) {
            console.error("SAFEPAY_WEBHOOK_SECRET is not configured");

            return NextResponse.json({ message: "Server configuration error" }, {
                status: 500,
            });
        }

        // Generate the signature ourselves
        const expectedSignature = crypto
            .createHmac("sha512", process.env.SAFEPAY_WEBHOOK_SECRET)
            .update(rawBody, "utf8")
            .digest("hex")
            .toLowerCase();

        // Compare Safepay's signature with our generated signature
        const receivedSignature = signature.toLowerCase();

        if (
            receivedSignature.length !== expectedSignature.length ||
            !crypto.timingSafeEqual(
                Buffer.from(receivedSignature),
                Buffer.from(expectedSignature)
            )
        ) {
            return NextResponse.json({ message: "Invalid signature" }, {
                status: 401,
            });
        }

        // Signature is valid, so now parse the webhook
        const body = JSON.parse(rawBody);

        if (body.type === "payment.succeeded") {
            await connectDB()

            const data = body.data;

            const customer = await Customer.findOneAndUpdate(
                {
                    email: data.customer_email
                },
                {
                    $set: {
                        email: data.customer_email,
                        name: data.metadata?.order_id.split("?")[0]
                    }
                },
                {
                    returnDocument: "after",
                    upsert: true
                }
            );
            
            if (!customer) {
                throw new Error("Customer could not be created or found");
            }
            
            await Payment.findOneAndUpdate(
                { tracker: data.tracker },
                {
                    $set: {
                        tracker: data.tracker,
                        paidTo: data.metadata?.order_id.split("?")[1],
                        state: data.state,
                        net: data.net,
                        fee: data.fee,
                        amount: (data.amount)/100,
                        currency: data.currency,
                        description: data.metadata?.source.split("?")[0],
                        chargedAt: new Date(
                            data.charged_at.seconds * 1000
                        ),
                        customerId: customer._id,
                        status: body.type
                    }
                },
                {
                    returnDocument: "after",
                    upsert: true
                }
            );
        }


        return NextResponse.json({ message: "Webhook received" }, {
            status: 200,
        });

    } catch (error) {
        console.error("Safepay webhook error:", error);

        return NextResponse.json({ message: "Webhook processing failed" }, {
            status: 500,
        });
    }
}