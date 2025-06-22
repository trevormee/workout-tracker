
import { useState } from "react";

function ExerciseForm({onAddExercise}) {
    const [name, setName] = useState('');
    const [weight, setWeight] = useState('');
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !weight || !reps || !sets) {
            alert('Please fill in all fields.');
            return;
        }

        const newExercise = {
            name,
            weight: parseInt(weight),
            sets: parseInt(sets),
            reps: parseInt(reps),
        }

        onAddExercise(newExercise);

        // Reset the form
        setName('');
        setWeight('');
        setSets('');
        setReps('');
    }; 

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Exercise Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
            />
             <input 
                type="number" 
                placeholder="Sets" 
                value={sets} 
                onChange={(e) => setSets(e.target.value)}
            />
            <input 
                type="number" 
                placeholder="Weight" 
                value={weight} 
                onChange={(e) => setWeight(e.target.value)}
            />
            <input 
                type="number" 
                placeholder="Reps" 
                value={reps} 
                onChange={(e) => setReps(e.target.value)}
            />
            <button type="submit">Add Exercise</button>
        </form>
        
    );

}

export default ExerciseForm;