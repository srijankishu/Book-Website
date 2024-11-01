import mongoose from "mongoose";

const bookSchema=mongoose.Schema({
    id:Number,
    name: String,
    title:String,
    author:String,
    price:Number,
    image:String,
    category:String,
    pdf: String, 
})

const Book = mongoose.model('Book',bookSchema);   

export default Book;