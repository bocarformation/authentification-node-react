import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    ref: String,
    category: String,
    quantity: Number, 
    price: Number,
    color: String,
    image: {
        src: String,
        alt: String
    }
}, {
    timestamps: true
})

const Product = mongoose.model("Product", productSchema)

export default Product