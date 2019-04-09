const mongoose = require('mongoose');

const File = new mongoose.Schema ({
    title: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,               // cria campos "created_at" e "updated_at"
    
    // quando for convertido em objeto ou json, chamará o campo virtual
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

// Campo virtual | campo existe apenas dentro da app e não no banco
File.virtual('url').get(function() {
    const url = process.env.URL || 'http://localhost:3333'

    return `${url}/files/${encodeURIComponent(this.path)}`;
})

module.exports = mongoose.model("File", File);