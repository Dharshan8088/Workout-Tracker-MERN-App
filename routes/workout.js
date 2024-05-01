const express = require('express');
const router = express.Router();

const {
    createWorkout,
    getWorkout,
    getWorkouts,
    updateWorkout,
    deleteWorkout
} = require('../controllers/workoutController');

const requireAuth = require('../middleware/requireAuth');

// middleware for auth for all routes
router.use(requireAuth);


//routes

// GET ALL REQ
router.get('/', getWorkouts);


//GET A SINGLE REQ
router.get('/:id', getWorkout);


//POST A REQ
router.post('/', createWorkout);


//DELETE A REQ
router.delete('/:id', deleteWorkout);


//PATCH A REQ
router.patch('/:id', updateWorkout);


module.exports = router;