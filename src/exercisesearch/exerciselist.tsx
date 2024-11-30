import { h, JSX } from 'preact';

/**
 * Props típus a ExerciseList komponenshez.
 */
type ExerciseListProps = {
  exercises: any[];
  selectExercise: (exercise: any) => void;
};

/**
 * ExerciseList komponens, amely megjeleníti a gyakorlatok listáját.
 * @param {ExerciseListProps} props - A komponens propjai, beleértve a gyakorlatok listáját és a kiválasztott gyakorlat beállításának függvényét.
 * @returns {JSX.Element} A ExerciseList komponens JSX eleme.
 */
const ExerciseList = ({ exercises, selectExercise }: ExerciseListProps): JSX.Element => {
  return (
    <div className="exercise-results">
      {exercises.length > 0 ? (
        exercises.map((exercise) => (
          <div key={exercise.id} onClick={() => selectExercise(exercise)} className="exercise-item">
            <h3>{exercise.name}</h3>
            <p>Muscle group: {exercise.target}</p>
          </div>
        ))
      ) : (
        <p>There are no results for your search.</p>
      )}
    </div>
  );
};

export default ExerciseList;