import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    name: {
        type: String,
      
    },
    description: {
        type: String,
       
    },
    image: {
        type: String,
        default:null
    },
    pdf: {
        type: String,
        default: null
    },
    views: {
        type: Number,
        default: 0,
    },
    tags: {
        type: [String],
        default: [],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true })

const Note = mongoose.models.notes || mongoose.model('notes', noteSchema);
export default Note; 