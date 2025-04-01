const mongoose= require('mongoose');
const Schema= mongoose.Schema;

const NoteSchema= new Schema({
    title: {
        type: String
    },
    status: { type: String, enum: ['pending', 'done'], default: 'pending' },
    content: {type: String},
    createdOn:{type: Date, default: new Date().getTime()},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})
module.exports= mongoose.model("Note", NoteSchema);