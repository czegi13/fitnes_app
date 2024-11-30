import { h, JSX } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import '../../styles/serviceshowcase.less'; // Ebben a fájlban lesz a stílus
import Notes from '../../assets/gym-notes.png'; // Kép útvonala
import Muscles from '../../assets/gym-muscle-groups.png'; // Kép útvonala
import Trainer from '../../assets/gym-trainer.png'; // Kép útvonala

// Képek és leírások objektumtömbje
const services = [
  {
    image: Notes,
    text: 'Track your training',
  },
  {
    image: Muscles,
    text: 'Exercises with demonstrations',
  },
  {
    image: Trainer,
    text: 'You can improve with the help of personal trainers',
  },
];

/**
 * ServiceShowcase komponens, amely egy diavetítést jelenít meg a szolgáltatásokról.
 * @returns {JSX.Element} A ServiceShowcase komponens JSX eleme.
 */
const ServiceShowcase = (): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatikus váltás 3 másodpercenként
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
    }, 3000); // 3 másodpercenként vált
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="service-showcase">
      <img src={services[currentIndex].image} alt="Service" className="service-image" />
      <div className="service-text-overlay">{services[currentIndex].text}</div>
    </div>
  );
};

export default ServiceShowcase;