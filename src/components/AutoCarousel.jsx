import React, { useEffect, useRef } from "react";

export const AutoCarousel = ({ title, children }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const step = 1;
    const intervalTime = 30;

    const startScrolling = () => {
      const interval = setInterval(() => {
        if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
          scrollContainer.scrollLeft = 0;
        } else {
          scrollContainer.scrollLeft += step;
        }
      }, intervalTime);
      return interval;
    };

    const scrollInterval = startScrolling();

    const handleMouseEnter = () => clearInterval(scrollInterval);
    const handleMouseLeave = () => {
    };
    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <section className="section-container">
      <h2 className="section-title">{title}</h2>
      <div
        className="horizontal-scroll-smooth"
        ref={scrollRef}
      >
        {children}
      </div>
    </section>
  );
};
