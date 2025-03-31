const mongoose= require('mongoose');
const Schema= mongoose.Schema;

const NoteSchema= new Schema({
    title: {
        type: String
    },
    content: {type: String},
    createdOn:{type: Date, default: new Date().getTime()},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})
module.exports= mongoose.model("Note", NoteSchema);