import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
    {
        tracker: {
            type: String,
            required: true,
            unique: true,
        },
        
        CustomerName: {
            type: String,
        },

        paidTo: {
            type: String,
        },

        state: {
            type: String
        },

        net: {
            type: Number
        },

        fee: {
            type: Number
        },

        amount: {
            type: Number,
            required: true,
        },

        currency: {
            type: String,
            required: true,
        },
        chargedAt: {
            type: Date
        },
        description: {
            type: String
        },

        status: {
            type: String,
        },
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
        },
    },
    {
        timestamps: true,
    }
);

if (process.env.NODE_ENV !== "production") {
    delete mongoose.models.Payment;
}

export default mongoose.models.Payment ||
    mongoose.model("Payment", TransactionSchema);