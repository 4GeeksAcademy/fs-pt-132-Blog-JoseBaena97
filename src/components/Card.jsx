import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Card = ({ id, name, image, type, subtitle }) => {
  const { store, dispatch } = useGlobalReducer();
  const detailPath = type === "character" ? `/character/${id}` : type === "episode" ? `/episode/${id}` : null;
  const imageBase = "https://cdn.thesimpsonsapi.com/200";
  const fullImage = image && image.startsWith("/") ? `${imageBase}${image}` : image || "https://placehold.co/400x600?text=No+Image";

  const isFavorite = store.favorites.some(item => item.id === id && item.type === type);

  const handleFavorite = (e) => {
    e.preventDefault();
    if (isFavorite) {
      dispatch({ type: "remove_favorite", payload: { id, type } });
    } else {
      const payload = { id, name, image, type, subtitle };
      dispatch({ type: "add_favorite", payload });
    }
  };

  return (
    <div className="card">
      <div className="card-img-container">
        {type !== "location" && (
          <button
            className={`btn-fav ${isFavorite ? "is-fav" : ""}`}
            onClick={handleFavorite}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? "♥" : "♡"}
          </button>
        )}
        <img src={fullImage} alt={name} className="card-img" loading="lazy" />
      </div>
      <div className={type === "location" ? "card-body-location" : "card-body"}>
        <div>
          <h3 className={type === "location" ? "card-title-location" : "card-title"}>{name}</h3>
          {type !== "location" && subtitle && (
            <p className="card-subtitle">
              {subtitle}
            </p>
          )}
        </div>
        {type !== "location" && (
          detailPath ? (
            <Link to={detailPath} className="btn-detail">
              Ver detalles
            </Link>
          ) : (
            <span className="btn-detail disabled">
              Info solo
            </span>
          )
        )}
      </div>
    </div>
  );
};
