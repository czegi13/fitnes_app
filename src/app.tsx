import { h } from 'preact';
import { useState } from 'preact/hooks';
import Navbar from './components/navbar/navbar';
import Home from './components/home/home';
import ExerciseSearch from './exercisesearch/exercisesearch';
import WorkoutLog from './workoutlog/workoutlog';
import About from './about/about';
import { SelectedPage } from './types/types';

export function App() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(SelectedPage.Home);
  const [currentUser, setCurrentUser] = useState(''); // Az aktuális felhasználó neve

  return (
    <div>
      <Navbar selectedPage={selectedPage} setSelectedPage={setSelectedPage} currentUser={currentUser} setCurrentUser={setCurrentUser} />
      {selectedPage === SelectedPage.Home && <Home />}
      {selectedPage === SelectedPage.Trainings && <ExerciseSearch />}
      {selectedPage === SelectedPage.About && <About currentUser={currentUser} />}
      {selectedPage === SelectedPage.TrainingLog && <WorkoutLog currentUser={currentUser} />}
    </div>
  );
}