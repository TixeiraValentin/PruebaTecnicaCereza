import { useState, useEffect } from 'react';
import "./carousel.css"
import LazyImage from '../LazyImage/LazyImage';
export function Carousel({ images }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImageIndex((prevIndex) => {
        return (prevIndex + 1) % images.length; 
      });
    }, 2000);

    return () => clearInterval(timer);
  }, [images]);

  return (
    <div className="image-container">
      {images && images.map((imageUrl, index) => (
        <LazyImage
          key={imageUrl}
          src={imageUrl}
          alt={`Producto ${index + 1}`} 
          className={`product-image ${index === activeImageIndex ? 'active' : ''}`}
        />
      ))}
    </div>
  );
}

