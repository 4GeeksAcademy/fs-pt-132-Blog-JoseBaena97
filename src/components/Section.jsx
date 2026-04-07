import React, { useRef } from "react";

export const Section = ({ title, children }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <section className="section-container-relative">
      <h2 className="section-title">{title}</h2>
      <div className="section-content-wrapper">
        <button className="scroll-btn prev" onClick={scrollLeft} aria-label="Scroll left">
          ‹
        </button>
        <div className="horizontal-scroll" ref={scrollRef}>
          {children}
        </div>
        <button className="scroll-btn next" onClick={scrollRight} aria-label="Scroll right">
          ›
        </button>
      </div>
    </section>
  );
};
