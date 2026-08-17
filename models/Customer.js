import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },

        name: {
            type: String,
        },
        
        safepayCustomerId: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

if (process.env.NODE_ENV !== "production") {
  delete mongoose.models.Customer;
}

export default mongoose.models.Customer ||
    mongoose.model("Customer", CustomerSchema, "customers");


 