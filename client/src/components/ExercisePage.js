import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const ExercisePage = () => {
  const [exerciseType, setExerciseType] = useState('');
  const [exerciseTime, setExerciseTime] = useState('');

  const ADD_EXERCISE = gql`
    mutation AddExercise($input: ExerciseInput!) {
      addExercise(input: $input) {
        _id
        name
        description
      }
    }
  `;

  const [addExercise] = useMutation(ADD_EXERCISE);

  const handleExerciseTypeChange = (event) => {
    setExerciseType(event.target.value);
  };

  const handleExerciseTimeChange = (event) => {
    setExerciseTime(event.target.value);
  };

  const handleSaveExercise = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');
      console.log('Token', token);

      if (!token) {
        throw new Error('Not logged in');
      }

      const { data } = await addExercise({
        variables: { input: { name: exerciseType, description: exerciseTime } },
        context: { headers: { authorization: `Bearer ${token}` } },
      });

      if (data.addExercise) {
        alert('Exercise Saved!');
        setExerciseType('');
        setExerciseTime('');
      }
    } catch (error) {
      console.log('Error occurred saving exercise', error);
    }
  };

  return (
    <div>
      <h1>Exercise Log</h1>
      <form>
        <label>
          Exercise Type:
          <select value={exerciseType} onChange={handleExerciseTypeChange}>
            <option value="">Select Exercise Type</option>
            <option value="Running">Running</option>
            <option value="Walking">Walking</option>
            <option value="Calisthenics">Calisthenics</option>
            <option value="Weight Lifting">Weight Lifting</option>
            <option value="Yoga">Yoga</option>
          </select>
        </label>
        <br />
        <label>
          Exercise Time (in minutes):
          <input type="text" value={exerciseTime} onChange={handleExerciseTimeChange} />
        </label>
        <br />
        <button type="submit" onClick={handleSaveExercise}>
          Save Exercise
        </button>
      </form>
    </div>
  );
};

export default ExercisePage;
