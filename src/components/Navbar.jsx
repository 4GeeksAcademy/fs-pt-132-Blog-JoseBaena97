import React, { useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleRemove = (e, item) => {
    e.preventDefault();
    dispatch({ type: "remove_favorite", payload: item });
  };

  const imageBase = "https://cdn.thesimpsonsapi.com/200";

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="favorites-dropdown">
          <button className="dropdown-btn" onClick={toggleDropdown}>
            Favoritos
            <span className="dropdown-badge">{store.favorites.length}</span>
          </button>

          {isOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-header">
                Tus Favoritos
              </div>
              {store.favorites.length === 0 ? (
                <div style={{ padding: "1rem", textAlign: "center", color: "#636e72" }}>
                  Aún no tienes favoritos.
                </div>
              ) : (
                store.favorites.map((item, index) => {
                  const detailPath = item.type === "character" ? `/character/${item.id}` : `/episode/${item.id}`;
                  const imgPath = item.image || item.portrait_path || item.image_path;
                  const fullImage = imgPath ? (imgPath.startsWith("http") ? imgPath : `${imageBase}${imgPath}`) : "https://placehold.co/40x40?text=NA";

                  return (
                    <Link to={detailPath} key={`${item.type}-${item.id}-${index}`} className="dropdown-item">
                      <div className="dropdown-item-info">
                        <img src={fullImage} alt={item.name} className="dropdown-item-img" />
                        <div>
                          <div className="dropdown-item-name">{item.name}</div>
                          <div className="dropdown-item-type">
                            {item.type === "character" ? "Personaje" : "Episodio"}
                          </div>
                        </div>
                      </div>
                      <button
                        className="delete-btn"
                        onClick={(e) => handleRemove(e, item)}
                        title="Eliminar de favoritos"
                      >
                        X
                      </button>
                    </Link>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};