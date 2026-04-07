import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export const EpisodeDetail = () => {
  const { id } = useParams();
  const [episode, setEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const imageBase = "https://cdn.thesimpsonsapi.com/200";

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        const res = await fetch(`https://thesimpsonsapi.com/api/episodes/${id}`);
        const data = await res.json();
        setEpisode(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching episode:", error);
        setLoading(false);
      }
    };
    fetchEpisode();
  }, [id]);

  if (loading) return <div className="loading-container"><div className="spinner"></div></div>;
  if (!episode) return <div className="container"><h1>Episodio no encontrado</h1></div>;

  const fullImage = episode.image_path ? `${imageBase}${episode.image_path}` : "https://placehold.co/400x600?text=No+Image";

  return (
    <div className="container">
      <Link to="/" className="btn-back">
        ← Volver atrás
      </Link>
      <div className="detail-container">
        <img src={fullImage} alt={episode.name} className="detail-img" />
        <div className="detail-info">
          <h1 className="detail-name">{episode.name}</h1>
          <div className="info-item">
            <span className="info-label">Temporada:</span>
            <span>{episode.season}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Episodio:</span>
            <span>{episode.episode_number}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Fecha de emisión:</span>
            <span>{episode.airdate || "Desconocida"}</span>
          </div>

          {episode.synopsis && (
            <div className="phrase-list-container">
              <h3 className="phrase-list-title">Sinopsis:</h3>
              <p className="synopsis-text">{episode.synopsis}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
