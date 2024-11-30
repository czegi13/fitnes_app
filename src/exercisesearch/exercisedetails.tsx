import { h, JSX } from 'preact';
import { useEffect, useState } from 'preact/hooks';

/**
 * Props típus a ExerciseDetails komponenshez.
 */
type ExerciseDetailsProps = {
  selectedExercise: any;
  goBack: () => void;
};

/**
 * ExerciseDetails komponens, amely megjeleníti a kiválasztott gyakorlat részleteit és kapcsolódó YouTube videókat.
 * @param {ExerciseDetailsProps} props - A komponens propjai, beleértve a kiválasztott gyakorlatot és a visszalépés függvényét.
 * @returns {JSX.Element} A ExerciseDetails komponens JSX eleme.
 */
const ExerciseDetails = ({ selectedExercise, goBack }: ExerciseDetailsProps): JSX.Element => {
  const [exerciseVideos, setExerciseVideos] = useState<any[]>([]);
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchExerciseDetails = async () => {
      try {
        // Fetch exercise details
        const response = await fetch(`https://exercisedb.p.rapidapi.com/exercises/exercise/${selectedExercise.id}`, {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': 'b82256fd54msh3e29a5d2d964aadp139a7fjsnb5a34b4bd823', // Replace with your actual API key
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
          }
        });
        const data = await response.json();
        setDescription(data.description);

        // Fetch YouTube videos
        const youtubeResponse = await fetch(`https://youtube-search-and-download.p.rapidapi.com/search?query=${data.name} exercise`, {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': 'b82256fd54msh3e29a5d2d964aadp139a7fjsnb5a34b4bd823', // Replace with your actual API key
            'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
          }
        });
        const youtubeData = await youtubeResponse.json();
        setExerciseVideos(youtubeData.contents);
      } catch (error) {
        console.error('Error fetching exercise details:', error);
      }
    };

    fetchExerciseDetails();
  }, [selectedExercise]);

  return (
    <div className="exercise-details">
      <button onClick={goBack} className="back-button">Back</button>
      <h2>{selectedExercise.name}</h2>
      <p>Muscle group: {selectedExercise.target}</p>
      <p>Equipment: {selectedExercise.equipment}</p>
      <img src={selectedExercise.gifUrl} alt={`${selectedExercise.name} bemutató`} className="exercise-gif" />
      <p>{description}</p>

      <div className="videos">
        {exerciseVideos.length ? (
          exerciseVideos.slice(0, 3).map((item, index) => (
            <a key={index} className="exercise-video" href={`https://www.youtube.com/watch?v=${item.video.videoId}`} target="_blank" rel="noreferrer">
              <img src={item.video.thumbnails[0].url} alt={item.video.title} className="video-thumbnail" />
              <p>{item.video.title}</p>
              <p>{item.video.channelName}</p>
            </a>
          ))
        ) : (
          <p>There are no videos available.</p>
        )}
      </div>
    </div>
  );
};

export default ExerciseDetails;