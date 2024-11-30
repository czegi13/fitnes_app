import { h, JSX } from 'preact';

/**
 * Props típus a ReviewHandler komponenshez.
 */
interface ReviewHandlerProps {
  reviews: any[];
  currentUser: string;
  reviewText: string;
  setReviewText: (text: string) => void;
  handleAddReview: () => void;
}

/**
 * ReviewHandler komponens, amely megjeleníti a véleményeket és lehetőséget biztosít új vélemények hozzáadására.
 * @param {ReviewHandlerProps} props - A komponens propjai, beleértve a véleményeket, az aktuális felhasználót, a vélemény szövegét és a vélemény hozzáadásának kezelőjét.
 * @returns {JSX.Element} A ReviewHandler komponens JSX eleme.
 */
const ReviewHandler = ({ reviews, currentUser, reviewText, setReviewText, handleAddReview }: ReviewHandlerProps): JSX.Element => {
  return (
    <div className="review-handler">
      <div className="reviews-container">
        <div className="reviews">
          {reviews.map((review, index) => (
            <div key={index} className="review">
              <h4>{review.username}</h4>
              <p>{review.text}</p>
            </div>
          ))}
        </div>
      </div>
      {currentUser && (
        <div className="add-review">
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText((e.target as HTMLTextAreaElement).value)}
            placeholder="Add your review here"
          />
          <button onClick={handleAddReview}>Add review</button>
        </div>
      )}
    </div>
  );
};

export default ReviewHandler;