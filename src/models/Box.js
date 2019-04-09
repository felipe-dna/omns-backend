const mongoose = require('mongoose');

const Box = new mongoose.Schema ({
    title: {
        type: String,
        required: true,
    },
    files: [
        {type: mongoose.Schema.Types.ObjectId, ref: "File"}],
}, {
    timestamps: true, // cria campos "created_at" e "updated_at"
});

module.exports = mongoose.model("Box", Box);