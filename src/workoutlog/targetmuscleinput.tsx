import { h, JSX } from 'preact';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

/**
 * Props típus a TargetMuscleInput komponenshez.
 */
type TargetMuscleInputProps = {
  targetMuscle: string;
  setTargetMuscle: (value: string) => void;
  generateWorkoutPlan: () => void;
};

/**
 * TargetMuscleInput komponens, amely lehetővé teszi a felhasználók számára, hogy megadják a célzott izomcsoportot és generáljanak egy edzéstervet.
 * @param {TargetMuscleInputProps} props - A komponens propjai, beleértve a célzott izomcsoportot, a célzott izomcsoport beállításának függvényét és az edzésterv generálásának függvényét.
 * @returns {JSX.Element} A TargetMuscleInput komponens JSX eleme.
 */
const TargetMuscleInput = ({ targetMuscle, setTargetMuscle, generateWorkoutPlan }: TargetMuscleInputProps): JSX.Element => {
  return (
    <div className="target-muscle-input">
      <TextField
        label="Which muscle group do you want to train?"
        value={targetMuscle}
        onChange={(e) => setTargetMuscle((e.target as HTMLInputElement).value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={generateWorkoutPlan} fullWidth>
      Generate a training plan
      </Button>
    </div>
  );
};

export default TargetMuscleInput;