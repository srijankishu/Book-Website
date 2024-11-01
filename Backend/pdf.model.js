import mongoose from "mongoose";

const pdfSchema = mongoose.Schema({
    pdf:String,
    title:String

})

const pdfDetails = mongoose.model('pdfDetails', pdfSchema);
export default pdfDetails;