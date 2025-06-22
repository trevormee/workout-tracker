import { useState } from 'react'
import './App.css'
import ExerciseForm from './components/ExerciseForm';

function App() {

  const [exercises, setExercises] = useState([]);

  const handleAddExercise = (newExercise) => {
    const updatedExercies = [
      ...exercises,
      newExercise
    ];

    setExercises(updatedExercies);
  };

  return (
    <>
      <h1>Workout Entry</h1>
      <ExerciseForm onAddExercise={handleAddExercise} />

      <ul>
        {exercises.map((ex, i) => (
          <li key={i}>
            {ex.name} — {ex.sets} sets of {ex.reps} reps @ {ex.weight} lbs
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
