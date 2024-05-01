
const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// GET all workouts
const getWorkouts = async (req, res) => {
    const user_id = req.user._id;

    const workouts = await Workout.find({ user_id }).sort({created_at: -1});
    res.status(200).send(workouts);
}


// GET A Single Workout
const getWorkout = async (req, res) => {
        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'No such Workout'});
        }

        const workout = await Workout.findById(id);

        if(!workout){
            return res.status(404).json({error: 'No such Workout'});
        }

        res.status(200).json(workout);
}



// POST an workout
const createWorkout = async (req, res) => {

    const { title, reps, load } = req.body;

    let emptyFields = []

    if(!title) {
        emptyFields.push('title');
    } 

    if(!reps) {
        emptyFields.push('reps');
    }

    if(!load) {
        emptyFields.push('load');
    }

    if(emptyFields.length > 0) {
        return res.status(400).json({error: "Please fill in all the fields", emptyFields});
    }

    // add post to db
    try{
        const user_id = req.user._id;
        const workout = await Workout.create({title, reps, load, user_id});
        res.status(200).json(workout);
    }catch(error){
        res.status(404).json({error: error.message});
    }

}


// PATCH a workout
const updateWorkout = async (req, res) => {

    const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'No such Workout'});
        }

        const workout = await Workout.findOneAndUpdate({_id: id}, {
            ...req.body,
        });

        if(!workout){
            return res.status(404).json({error: 'No such Workout'});
        }

        res.status(200).json(workout);
}


// DELETE a workout
const deleteWorkout =async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Workout'});
    }

    const workout = await Workout.findOneAndDelete({_id: id});

    if(!workout){
        return res.status(404).json({error: 'No such Workout'});
    }

    res.status(200).json(workout);


}









module.exports = {
    createWorkout,
    getWorkout,
    getWorkouts,
    updateWorkout,
    deleteWorkout
}