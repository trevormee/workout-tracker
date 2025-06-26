

// import { useState } from "react";
// import "./App.css";
// import ExerciseForm from "./components/ExerciseForm";

// interface Exercise {
//   name: string;
//   sets: number;
//   weight: number;
//   reps: number;
// }

// function App() {
//   const [exercises, setExercises] = useState<Exercise[]>([]);

//   const handleAddExercise = (newExercise: Exercise) => {
//     const updatedExercises = [...exercises, newExercise];
//     setExercises(updatedExercises);
//   };

//   return (
//     <>
//       <h1>Workout Entry</h1>
//       <ExerciseForm onAddExercise={handleAddExercise} />

//       <ul>
//         {exercises.map((ex, i) => (
//           <li key={i}>
//             {ex.name} — {ex.sets} sets of {ex.reps} reps @ {ex.weight} lbs
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// }

// export default App;


// App.tsx

import { useState } from "react";
import "./App.css";
import Login from "./components/Login"


function App() {
  

  return (
    <div>
      <Login />
    </div>
  );
}

export default App;
