import { h, JSX } from 'preact';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

/**
 * Props típus a WorkoutPlan komponenshez.
 */
type WorkoutPlanProps = {
  workoutPlan: any[];
  handleAddToLog: () => void;
};

/**
 * WorkoutPlan komponens, amely megjeleníti az aktuális edzéstervet és lehetőséget biztosít a naplóhoz való hozzáadásra.
 * @param {WorkoutPlanProps} props - A komponens propjai, beleértve az edzéstervet és a naplóhoz való hozzáadás függvényét.
 * @returns {JSX.Element} A WorkoutPlan komponens JSX eleme.
 */
const WorkoutPlan = ({ workoutPlan, handleAddToLog }: WorkoutPlanProps): JSX.Element => {
  return (
    <Box className="workout-plan" mb={4}>
      <Typography variant="h5" component="h3" gutterBottom>
      Today's workout plan
      </Typography>
      <ul>
        {workoutPlan.map((exercise) => (
          <li key={exercise.id}>{exercise.name}</li>
        ))}
      </ul>
      <Button variant="contained" color="primary" onClick={handleAddToLog} fullWidth>
        Add to log
      </Button>
    </Box>
  );
};

export default WorkoutPlan;