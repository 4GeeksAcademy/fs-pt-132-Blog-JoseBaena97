import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export const CharacterDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const imageBase = "https://cdn.thesimpsonsapi.com/200";

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const res = await fetch(`https://thesimpsonsapi.com/api/characters/${id}`);
        const data = await res.json();
        setCharacter(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching character:", error);
        setLoading(false);
      }
    };
    fetchCharacter();
  }, [id]);

  if (loading) return <div className="loading-container"><div className="spinner"></div></div>;
  if (!character) return <div className="container"><h1>Personaje no encontrado</h1></div>;

  const fullImage = character.portrait_path ? `${imageBase}${character.portrait_path}` : "https://placehold.co/400x600?text=No+Image";

  return (
    <div className="container">
      <Link to="/" className="btn-back">
        ← Volver atrás
      </Link>
      <div className="detail-container">
        <img src={fullImage} alt={character.name} className="detail-img" />
        <div className="detail-info">
          <h1 className="detail-name">{character.name}</h1>
          <div className="info-item">
            <span className="info-label">Edad:</span>
            <span>{character.age || "Desconocida"}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Ocupación:</span>
            <span>{character.occupation || "Desconocida"}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Estado:</span>
            <span className={character.status === "Alive" ? "status-alive" : "status-dead"}>
              {character.status}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Género:</span>
            <span>{character.gender}</span>
          </div>

          {character.phrases && character.phrases.length > 0 && (
            <div className="phrase-list-container">
              <h3 className="phrase-list-title">Frases típicas:</h3>
              {character.phrases.slice(0, 5).map((phrase, index) => (
                <div key={index} className="phrase-item">"{phrase}"</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
