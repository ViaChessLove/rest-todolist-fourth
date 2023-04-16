import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


import todoRouter from './Todo/router.js';

dotenv.config();

const PORT = process.env.PORT;

const DB_URL = process.env.DB_URL;

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', todoRouter);

(async () => {
  try {
    const connect = await mongoose.connect(DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    if (connect) {
      app.listen(PORT, () => (
        console.log(`SERVER IS ON ${PORT}`)
      ));
    }
  } catch (e) {
    console.warn(e);
  }
})();