import React from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice";
import "./FeaturedStrip.css";

const calcDiscountPercent = (original, current) => {
  if (!original || !current || original <= current) return 0;
  return Math.round(((original - current) / original) * 100);
};

const FeaturedStrip = ({ artworks }) => {
  if (!Array.isArray(artworks) || artworks.length === 0) return null;

  return (
    <div className="featured-strip-wrapper">
      <div className="featured-strip">
        {artworks.map((art) => {
          const id = art?._id || art?.id || Math.random().toString(36);
          const hasDiscount =
            typeof art.originalPrice === "number" &&
            typeof art.price === "number" &&
            art.originalPrice > art.price;
          const discount = calcDiscountPercent(art.originalPrice, art.price);
          return (
            <Link
              to={`/artworks/${id}`}
              key={id}
              className="featured-card"
              aria-label={art?.title || "Artwork"}
            >
              {hasDiscount && (
                <div className="badge"> {discount}% off </div>
              )}
              <div className="featured-image-wrapper">
                <img
                  loading="lazy"
                  src={art?.imageUrl || "/fallback-art.jpg"}
                  alt={art?.title || "Artwork image"}
                  className="featured-image"
                />
                <div className="overlay">
                  <span className="overlay-text">Quick Buy</span>
                </div>
              </div>
              <div className="featured-info">
                <div className="artist-name-small">{art?.artistName || "Unknown Artist"}</div>
                <div className="title-small">{art?.title || "Untitled"}</div>
                <div className="price-row">
                  <span className="from-label">From</span>
                  <span className="current-price">
                    {formatPrice(art?.price)}
                  </span>
                  {hasDiscount && (
                    <span className="original-price">
                      {formatPrice(art?.originalPrice)}
                    </span>
                  )}
                  {hasDiscount && <span className="sale-tag">Sale</span>}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedStrip;
