// import { useState } from 'react';

// function ExerciseForm({ onAddExercise }) {
//   const [exercise, setExercise] = useState({
//     name: '',
//     sets: '',
//     weight: '',
//     reps: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setExercise(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!exercise.name || !exercise.sets || !exercise.weight || !exercise.reps) {
//       alert('Please fill in all fields.');
//       return;
//     }

//     onAddExercise({
//       name: exercise.name,
//       sets: parseInt(exercise.sets),
//       weight: parseFloat(exercise.weight),
//       reps: parseInt(exercise.reps, 10),
//     });

//     setExercise({ name: '', sets: '', weight: '', reps: '' });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         name="name"
//         type="text"
//         placeholder="Exercise Name"
//         value={exercise.name}
//         onChange={handleChange}
//       />
//       <input
//         name="sets"
//         type="number"
//         placeholder="Sets"
//         value={exercise.sets}
//         onChange={handleChange}
//       />
//       <input
//         name="weight"
//         type="number"
//         placeholder="Weight (lbs)"
//         value={exercise.weight}
//         onChange={handleChange}
//       />
//       <input
//         name="reps"
//         type="number"
//         placeholder="Reps"
//         value={exercise.reps}
//         onChange={handleChange}
//       />
//       <button type="submit">Add Exercise</button>
//     </form>
//   );
// }

// export default ExerciseForm;

import { useState, ChangeEvent, FormEvent } from "react";

interface ExerciseInput {
  name: string;
  sets: string;
  weight: string;
  reps: string;
}

interface Exercise {
  name: string;
  sets: number;
  weight: number;
  reps: number;
}

interface ExerciseFormProps {
  onAddExercise: (exercise: Exercise) => void;
}

function ExerciseForm({ onAddExercise }: ExerciseFormProps) {
  const [exercise, setExercise] = useState<ExerciseInput>({
    name: "",
    sets: "",
    weight: "",
    reps: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExercise((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !exercise.name ||
      !exercise.sets ||
      !exercise.weight ||
      !exercise.reps
    ) {
      alert("Please fill in all fields.");
      return;
    }

    onAddExercise({
      name: exercise.name,
      sets: parseInt(exercise.sets),
      weight: parseFloat(exercise.weight),
      reps: parseInt(exercise.reps),
    });

    setExercise({ name: "", sets: "", weight: "", reps: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        type="text"
        placeholder="Exercise Name"
        value={exercise.name}
        onChange={handleChange}
      />
      <input
        name="sets"
        type="number"
        placeholder="Sets"
        value={exercise.sets}
        onChange={handleChange}
      />
      <input
        name="weight"
        type="number"
        placeholder="Weight (lbs)"
        value={exercise.weight}
        onChange={handleChange}
      />
      <input
        name="reps"
        type="number"
        placeholder="Reps"
        value={exercise.reps}
        onChange={handleChange}
      />
      <button type="submit">Add Exercise</button>
    </form>
  );
}

export default ExerciseForm;
