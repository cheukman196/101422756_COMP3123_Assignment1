require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes.js')
const employeeRouter = require('./routes/employeeRoutes.js')

const app = express();
app.use(express.json());

// const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true }};

async function run() {
  try {
    // await mongoose.connect(uri, clientOptions);
    await mongoose.connect(process.env.MONGO_URI);
    await mongoose.connection.db.admin().command({ ping: 1 });
    
    
    // =============================
    app.get('/', (req, res) => {
        res.send('Welcome to Assignment 1');
    })

    app.use('/api/v1/user', userRouter);
    app.use('/api/v1/emp',employeeRouter);

    app.listen(process.env.PORT, () => { console.log('Server is running...') });

    // =============================

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } 
  finally {
    // await mongoose.disconnect();
  }
}

run().catch(console.dir);


