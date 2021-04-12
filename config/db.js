const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const db = process.env.MONGO_URI;

const conectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });

        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = conectDB;
