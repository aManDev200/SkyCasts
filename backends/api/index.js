const express = require('express');
const cors = require('cors');
const z = require('zod');
const { Contact, connectToDb } = require('./db');

const port = 3000;
const app = express();

app.use(express.json());
app.use(cors());

const zodSchema = z.object({
    name: z.string(),
    phoneNumber: z.string(),
    email: z.string().email(),
    message: z.string()
});


app.get('/',(req,res)=>{
    res.json({
        message: "This is up and Live 😊"
    })
});
app.post('/contact', async (req, res) => {
    const overall = req.body;
    const zodValidation = zodSchema.safeParse(overall);
    if (!zodValidation.success) {
        return res.status(400).json({
            message: "Invalid input",
            errors: zodValidation.error.errors
        });
    }

    try {
        await Contact.create(overall);
        res.status(201).json({
            message: "Thank you for your feedback 😊"
        });
    } catch (e) {
        console.error('Database error:', e);
        res.status(500).json({
            message: "An error occurred while processing your request"
        });
    }
});

connectToDb()
    .then(() => {
        app.listen(port, () => {
            console.log(`The server is live on ${port}.`);
        }).on('error', (error) => {
            console.error('Failed to start server:', error);
        });
    })
    .catch((error) => {
        console.error('Failed to connect to database:', error);
    });

    module.exports = app;
