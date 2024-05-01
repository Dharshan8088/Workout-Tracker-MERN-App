const express = require('express');
require('dotenv').config();

const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workout.js');
const userRoutes = require('./routes/user.js');


const app = express();


//middleware
app.use(express.json());

app.use((req,res,next) => {
    // console.log(req.path, req.method);
    next();
})


//routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);





mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Connected to DB and listening on port ',process.env.PORT);
        })
    })
    .catch(error => console.log(error));



