import { h, JSX } from 'preact';
import '../../styles/home.less';
import ServiceShowcase from '../service/serviceshowcase';

/**
 * Home komponens, amely a kezdőlap tartalmát jeleníti meg.
 * @returns {JSX.Element} A Home komponens JSX eleme.
 */
const Home = (): JSX.Element => {
  return (
    <>
      <div className="home-container">
        <h1>Welcome on our Home Page!</h1>
        {/* További tartalmak itt */}
      </div>
      <div className="summary-container">
        <div className="summary-text">
          <h2>Purpose of the website</h2>
          <p>We will show you how to execute each exercise correctly.</p>
          <p>We help you track your training with training plans</p>
          <p>We help with YouTube videos made by our personal trainers.</p>
        </div>
        <ServiceShowcase /> {/* A slideshow komponens a fő tartalom mellett */}
      </div>

      {/* Footer hozzáadása */}
      <footer>
        <p>&copy; 2024 Fitness Website. All rights reserved.</p>
        <p>
          <a href="/contact">Contact</a> | 
          <a href="/privacy-policy">Privacy policy</a>
        </p>
      </footer>
    </>
  );
};

export default Home;
