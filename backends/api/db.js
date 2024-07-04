
const mongoose = require("mongoose");

async function connectToDb() {
    try {
        await mongoose.connect('mongodb+srv://amandev200:Yourname%401@cluster0.fzhdktd.mongodb.net/SkyCast');
    } catch (error) {
        console.log(error);
        throw new Error("Cannot connect to MongoDB");
    }
}

async function disconnectFromDb() {
    try {
        await mongoose.disconnect();
    } catch (error) {
        console.log(error);
        throw new Error("Cannot Disconnect from MongoDB");
    }
}

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    message: {
        type: String,
        required: true,
        trim: true
    }
});

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = { connectToDb, disconnectFromDb, Contact };
