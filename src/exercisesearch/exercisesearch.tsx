import { h, JSX } from 'preact';
import { useState } from 'preact/hooks';
import '../styles/exercisesearch.less';
import SearchBar from './searchbar';
import ExerciseList from './exerciselist';
import ExerciseDetails from './exercisedetails';

/**
 * ExerciseSearch komponens, amely lehetővé teszi a felhasználók számára, hogy gyakorlatokat keressenek és megtekintsék azok részleteit.
 * @returns {JSX.Element} A ExerciseSearch komponens JSX eleme.
 */
const ExerciseSearch = (): JSX.Element => {
  const [query, setQuery] = useState('');
  const [exercises, setExercises] = useState<any[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<any | null>(null);

  /**
   * Gyakorlatok lekérése az API-ból a keresési lekérdezés alapján.
   */
  const fetchExercises = async () => {
    try {
      const response = await fetch(`https://exercisedb.p.rapidapi.com/exercises/name/${query}?limit=0`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'b82256fd54msh3e29a5d2d964aadp139a7fjsnb5a34b4bd823', // Replace with your actual API key
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
      });
      const data = await response.json();
      console.log('Data:', data);
      setExercises(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  /**
   * Keresési függvény, amely meghívja a fetchExercises függvényt, ha a keresési lekérdezés nem üres.
   */
  const handleSearch = () => {
    if (query.trim() !== '') {
      fetchExercises();
    }
  };

  /**
   * Gyakorlat kiválasztása és részleteinek megjelenítése.
   * @param {any} exercise - A kiválasztott gyakorlat.
   */
  const selectExercise = (exercise: any) => {
    setSelectedExercise(exercise);
  };

  /**
   * Visszalépés a gyakorlatok listájához.
   */
  const goBack = () => {
    setSelectedExercise(null);
  };

  return (
    <div className="exercise-search-container">
      {!selectedExercise ? (
        <>
          <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} />
          <ExerciseList exercises={exercises} selectExercise={selectExercise} />
        </>
      ) : (
        <ExerciseDetails selectedExercise={selectedExercise} goBack={goBack} />
      )}
    </div>
  );
};

export default ExerciseSearch;