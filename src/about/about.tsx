import { h, JSX } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import '../styles/about.less';
import ReviewHandler from './reviewhandler';

/**
 * Props típus a About komponenshez.
 */
interface AboutProps {
  currentUser: string;
}

/**
 * About komponens, amely bemutatja az oldal által használt API-kat és lehetőséget biztosít a felhasználóknak vélemények írására.
 * @param {AboutProps} props - A komponens propjai, beleértve az aktuális felhasználó nevét.
 * @returns {JSX.Element} A About komponens JSX eleme.
 */
const About = ({ currentUser }: AboutProps): JSX.Element => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewText, setReviewText] = useState('');

  // Vélemények betöltése a localStorage-ból
  useEffect(() => {
    const savedReviews = localStorage.getItem('reviews');
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, []);

  // Vélemények mentése a localStorage-ba
  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

  /**
   * Új vélemény hozzáadása a vélemények listájához.
   */
  const handleAddReview = () => {
    if (reviewText.trim()) {
      setReviews([...reviews, { username: currentUser, text: reviewText }]);
      setReviewText('');
    }
  };

  return (
    <div className="about-container">
      <h2>About us</h2>
      <p>The site uses various APIs to provide the best experience for users.</p>
      <h3>Used APIs:</h3>
      <ul>
        <li><strong>RapidAPI:</strong>We use the RapidAPI platform to access and manage the ExerciseDB and Youtube Search and Download API.</li>
        <li><strong>ExerciseDB API:</strong>This API provides data for various exercises that we use for training plans.</li>
        <li><strong>YouTube Search and Download API:</strong>Using the YouTube API, we search for and display videos related to training plans.</li>
      </ul>
      <ReviewHandler
        reviews={reviews}
        currentUser={currentUser}
        reviewText={reviewText}
        setReviewText={setReviewText}
        handleAddReview={handleAddReview}
      />
    </div>
  );
};

export default About;