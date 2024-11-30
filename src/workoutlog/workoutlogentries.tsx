import { h, JSX } from 'preact';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

/**
 * Props típus a WorkoutLogEntries komponenshez.
 */
type WorkoutLogEntriesProps = {
  workoutLog: any[];
  handleDeleteLog: (index: number) => void;
};

/**
 * WorkoutLogEntries komponens, amely megjeleníti a naplózott edzésterveket és lehetőséget biztosít azok törlésére.
 * @param {WorkoutLogEntriesProps} props - A komponens propjai, beleértve a naplózott edzésterveket és a törlésükhöz szükséges függvényt.
 * @returns {JSX.Element} A WorkoutLogEntries komponens JSX eleme.
 */
const WorkoutLogEntries = ({ workoutLog, handleDeleteLog }: WorkoutLogEntriesProps): JSX.Element => {
  return (
    <div className="workout-log-entries">
      {workoutLog.map((log, index) => (
        <Card key={index} className="workout-log-entry">
          <CardContent>
            <Typography variant="h5" component="div">
            Training log
            </Typography>
            <ul>
              {log.workoutPlan.map((exercise) => (
                <li key={exercise.id}>{exercise.name}</li>
              ))}
            </ul>
            <IconButton onClick={() => handleDeleteLog(index)} color="secondary" className="delete-button">
              <DeleteIcon />
            </IconButton>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default WorkoutLogEntries;