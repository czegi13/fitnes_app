import { h, JSX } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import '../styles/workoutlog.less';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TargetMuscleInput from './targetmuscleinput';
import WorkoutPlan from './workoutplan';
import WorkoutLogEntries from './workoutlogentries';

/**
 * Props típus a WorkoutLog komponenshez.
 */
type WorkoutLogProps = {
  currentUser: string;
};

/**
 * WorkoutLog komponens, amely lehetővé teszi a felhasználók számára, hogy edzésterveket generáljanak és naplózzanak.
 * @param {WorkoutLogProps} props - A komponens propjai, beleértve az aktuális felhasználó nevét.
 * @returns {JSX.Element} A WorkoutLog komponens JSX eleme.
 */
const WorkoutLog = ({ currentUser }: WorkoutLogProps): JSX.Element => {
  const [exercises, setExercises] = useState<any[]>([]);
  const [workoutPlan, setWorkoutPlan] = useState<any[]>([]);
  const [workoutLog, setWorkoutLog] = useState<any[]>([]);
  const [targetMuscle, setTargetMuscle] = useState('');

  // Gyakorlatok lekérése az API-ból
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch('https://exercisedb.p.rapidapi.com/exercises?limit=0', {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': 'b82256fd54msh3e29a5d2d964aadp139a7fjsnb5a34b4bd823', // Replace with your actual API key
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
          }
        });
        const data = await response.json();
        setExercises(data);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    fetchExercises();

    // Edzésnapló betöltése a localStorage-ból
    if (currentUser) {
      const savedWorkoutLog = localStorage.getItem(`workoutLog_${currentUser}`);
      if (savedWorkoutLog) {
        setWorkoutLog(JSON.parse(savedWorkoutLog));
      }
    }
  }, [currentUser]);

  // Edzésnapló mentése a localStorage-ba
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`workoutLog_${currentUser}`, JSON.stringify(workoutLog));
    }
  }, [workoutLog, currentUser]);

  /**
   * Edzésterv generálása a célzott izomcsoport alapján.
   */
  const generateWorkoutPlan = () => {
    const filteredExercises = exercises.filter((exercise) =>
      exercise.target.toLowerCase().includes(targetMuscle.toLowerCase())
    );
    const shuffledExercises = filteredExercises.sort(() => 0.5 - Math.random());
    const selectedExercises = shuffledExercises.slice(0, 5); // Válasszon ki 5 véletlenszerű gyakorlatot
    setWorkoutPlan(selectedExercises);
  };

  /**
   * Edzésterv hozzáadása a naplóhoz.
   */
  const handleAddToLog = () => {
    if (workoutPlan.length > 0) {
      setWorkoutLog([...workoutLog, { workoutPlan }]);
      setWorkoutPlan([]);
    }
  };

  /**
   * Edzésterv törlése a naplóból.
   * @param {number} index - A törlendő edzésterv indexe.
   */
  const handleDeleteLog = (index: number) => {
    const updatedLog = workoutLog.filter((_, i) => i !== index);
    setWorkoutLog(updatedLog);
  };

  return (
    <Container maxWidth="md" className="workout-log-container">
      <Typography variant="h4" component="h2" gutterBottom>
      Training log
      </Typography>
      <Box className="target-muscle-input" mb={4}>
        <TargetMuscleInput
          targetMuscle={targetMuscle}
          setTargetMuscle={setTargetMuscle}
          generateWorkoutPlan={generateWorkoutPlan}
        />
      </Box>
      {workoutPlan.length > 0 && (
        <Box className="workout-plan" mb={4}>
          <WorkoutPlan
            workoutPlan={workoutPlan}
            handleAddToLog={handleAddToLog}
          />
        </Box>
      )}
      <div className="workout-log-entries">
        <WorkoutLogEntries workoutLog={workoutLog} handleDeleteLog={handleDeleteLog} />
      </div>
    </Container>
  );
};

export default WorkoutLog;