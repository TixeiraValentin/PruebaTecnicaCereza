import React, { useEffect, useRef } from "react";

function LazyImage({ src, alt, className}) {
  const imgRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          img.src = src;
          observer.disconnect();
        }
      });
    });
    observer.observe(img);

    return () => {
      observer.disconnect();
    };
  }, [src]);

  return <img className={className} ref={imgRef} alt={alt} />;
}

export default LazyImage;
