// console.log("🏠 HomePage rendered");

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const HomePage = () => {
//     const [topArtworks, setTopArtworks] = useState([]);
//     const [topArtists, setTopArtists] = useState([]);

//     useEffect(() => {
//         const fetchHomeData = async () => {
//             try {
//                 const [ratedRes, artistsRes] = await Promise.all([
//                     axios.get("/api/artworks/top-rated"),
//                     axios.get("/api/artworks/top-artists"),
//                 ]);
//                 //         //added *
//                 //         if (process.env.NODE_ENV === "development") {
//                 //   console.log("🎨 top-rated response:", ratedRes.data);
//                 //   console.log("🧑‍🎨 top-artists response:", artistsRes.data);
//                 // }
//                 // setTopArtworks(ratedRes.data);
//                 // setTopArtists(artistsRes.data);
//                 // Adjust according to actual structure*, fallback handling
//                 setTopArtworks(ratedRes.data.data || ratedRes.data.topArtworks || []);
//                 setTopArtists(artistsRes.data.data || artistsRes.data.topArtists || []);
//             } catch (err) {
//                 console.error("Error loading home data", err);
//             }
//         };
//         fetchHomeData();
//     }, []);

//     return (
//         <div className="px-4 md:px-10 py-8 max-w-7xl mx-auto">
//             {/* Hero Section */}
//             <section className="text-center py-12 bg-gradient-to-r from-indigo-100 to-white rounded-3xl shadow mb-12">
//                 <h1 className="text-4xl md:text-6xl font-bold mb-4 text-indigo-700">
//                     Welcome to Artify
//                 </h1>
//                 <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
//                     Discover and support talented artists from around the world.
//                 </p>
//                 <Link to="/artworks">
//                     <button className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all">
//                         Explore Artworks
//                     </button>
//                 </Link>
//             </section>

//             {/* Top Rated Artworks */}
//             <section className="mt-10">
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-6">🌟 Top Rated Artworks</h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//                     {topArtworks.map((artwork) => (
//                         <Link
//                             to={`/artworks/${artwork._id}`}
//                             key={artwork._id}
//                             className="relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all group"
//                         >
//                             <img
//                                 loading="lazy" //lazy loading images to boost performance:*
//                                 src={artwork.imageUrl || "/fallback-art.jpg"}
//                                 alt={artwork.title}
//                                 className="w-full h-60 object-cover group-hover:scale-105 transition-transform"
//                             />
//                             {artwork.sold && (
//                                 <span className="absolute top-2 right-2 bg-red-600 text-white px-2 py-0.5 text-xs rounded-lg shadow">
//                                     Sold
//                                 </span>
//                             )}
//                             <div className="p-4">
//                                 <h3 className="text-lg font-semibold">{artwork.title}</h3>
//                                 <p className="text-sm text-gray-600">{artwork.category}</p>
//                                 <p className="mt-2 text-indigo-600 font-bold">₹{artwork.price}</p>
//                             </div>
//                         </Link>
//                     ))}
//                 </div>
//             </section>

//             {/* Top Artists */}
//             <section className="mt-16">
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-6">🎨 Top Artists</h2>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
//                     {topArtists.map((artist) => (
//                         <div
//                             key={artist._id}
//                             className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg text-center transition-all border border-indigo-100"
//                         >
//                             <h3 className="font-semibold text-lg text-indigo-800">{artist.name}</h3>
//                             <p className="text-sm text-gray-600">{artist.email}</p>
//                             <p className="text-sm font-medium text-gray-700 mt-1">
//                                 Sold: {artist.totalSold}
//                             </p>
//                         </div>
//                     ))}
//                 </div>
//             </section>
//         </div>
//     );
// };

// export default HomePage;

import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./HomePage.css";

const formatPrice = (price) => {
  if (price == null) return "-";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(price);
};

const getInitials = (name = "") => {
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};

/* Artwork Card */
const ArtworkCard = ({ artwork }) => {
  const id = artwork?._id || artwork?.id || Math.random().toString(36);
  return (
    <Link
      to={`/artworks/${id}`}
      key={id}
      className="art-card"
      aria-label={`View artwork: ${artwork?.title || "Untitled"}`}
    >
      <div className="image-wrapper">
        <img
          loading="lazy"
          src={artwork?.imageUrl || "/fallback-art.jpg"}
          alt={artwork?.title || "Artwork image"}
          className="art-image"
        />
      </div>
      {artwork?.sold && <span className="sold-badge">Sold</span>}
      <div className="card-body">
        <h3 className="art-title">{artwork?.title || "Untitled"}</h3>
        {artwork?.category && (
          <p className="art-category">{artwork.category}</p>
        )}
        <p className="art-price">{formatPrice(artwork?.price)}</p>
      </div>
    </Link>
  );
};

/* Artist Card */
const ArtistCard = ({ artist }) => {
  const id = artist?._id || artist?.id || Math.random().toString(36);
  return (
    <div key={id} className="artist-card">
      <div className="artist-avatar">
        {artist?.avatarUrl ? (
          <img
            src={artist.avatarUrl}
            alt={artist.name || "Artist avatar"}
            className="avatar-img"
            loading="lazy"
          />
        ) : (
          <div className="avatar-fallback">{getInitials(artist?.name)}</div>
        )}
      </div>
      <div className="artist-info">
        <h3 className="artist-name">
          {artist?.name || "Unnamed Artist"}
        </h3>
        {artist?.email && <p className="artist-email">{artist.email}</p>}
        <p className="artist-sold">Sold: {artist?.totalSold ?? 0}</p>
      </div>
    </div>
  );
};

/* Horizontal scroller with arrows */
const ArtworkScroller = ({ artworks }) => {
  const containerRef = useRef(null);
  const scrollAmount = 300;

  const scroll = (dir = "right") => {
    const el = containerRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    let target =
      dir === "right" ? el.scrollLeft + scrollAmount : el.scrollLeft - scrollAmount;

    if (target > maxScroll) {
      target = 0;
    } else if (target < 0) {
      target = maxScroll;
    }

    el.scrollTo({
      left: target,
      behavior: "smooth",
    });
  };

  if (!Array.isArray(artworks) || artworks.length === 0) return null;

  return (
    <div className="scroller-wrapper">
      <button
        className="scroller-arrow left"
        aria-label="Scroll left"
        onClick={() => scroll("left")}
      >
        ‹
      </button>
      <div className="scroller-container" ref={containerRef}>
        {artworks.map((art) => {
          const id = art?._id || art?.id || Math.random().toString(36);
          return (
            <Link
              to={`/artworks/${id}`}
              key={id}
              className="scroller-card"
              aria-label={art?.title || "Artwork"}
            >
              <div className="scroller-img-wrapper">
                <img
                  loading="lazy"
                  src={art?.imageUrl || "/fallback-art.jpg"}
                  alt={art?.title || "Artwork image"}
                />
              </div>
              <div className="scroller-info">
                <div className="scroller-title">{art?.title || "Untitled"}</div>
                <div className="scroller-price">{formatPrice(art?.price)}</div>
              </div>
            </Link>
          );
        })}
      </div>
      <button
        className="scroller-arrow right"
        aria-label="Scroll right"
        onClick={() => scroll("right")}
      >
        ›
      </button>
    </div>
  );
};

const HomePage = () => {
  const [topArtworks, setTopArtworks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchHomeData = async () => {
      try {
        const [ratedRes, artistsRes] = await Promise.all([
          axios.get("/api/artworks/top-rated"),
          axios.get("/api/artworks/top-artists"),
        ]);

        if (process.env.NODE_ENV === "development") {
          console.log("🎨 top-rated response:", ratedRes.data);
          console.log("🧑‍🎨 top-artists response:", artistsRes.data);
        }

        if (!isMounted) return;

        const artworks =
          ratedRes?.data?.data ||
          ratedRes?.data?.topArtworks ||
          (Array.isArray(ratedRes?.data) ? ratedRes.data : []);
        const artists =
          artistsRes?.data?.data ||
          artistsRes?.data?.topArtists ||
          (Array.isArray(artistsRes?.data) ? artistsRes.data : []);

        setTopArtworks(Array.isArray(artworks) ? artworks : []);
        setTopArtists(Array.isArray(artists) ? artists : []);
      } catch (err) {
        console.error("Error loading home data", err);
        if (isMounted) {
          setError("Failed to load home data. Please try again later.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchHomeData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="container">
      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">Welcome to Artify</h1>
        <p className="hero-subtitle">
          Discover and support talented artists from around the world.
        </p>
        <Link to="/artworks" aria-label="Explore all artworks">
          <button className="primary-btn">Explore Artworks</button>
        </Link>
      </section>

      {/* Marquee Banner */}
      <div className="marquee-wrapper">
        <div className="marquee">
          <span className="marquee-content">
            🖼️ Limited time: Get 10% off on select artworks with code{" "}
            <strong>ART10</strong> | New artists featured weekly! 🎨
          </span>
          <span className="marquee-content">
            🖼️ Limited time: Get 10% off on select artworks with code{" "}
            <strong>ART10</strong> | New artists featured weekly! 🎨
          </span>
        </div>
      </div>

      {loading && (
        <div className="status-message">
          <p>Loading featured art and artists…</p>
        </div>
      )}

      {error && (
        <div className="error-box">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Top Rated Artworks */}
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">🌟 Top Rated Artworks</h2>
              {topArtworks.length === 0 && (
                <p className="empty-note">No artworks to show yet.</p>
              )}
            </div>
            <div className="artwork-grid">
              {topArtworks.map((artwork) => (
                <ArtworkCard key={artwork._id || artwork.id} artwork={artwork} />
              ))}
            </div>

            {/* Scrolling marquee-style strip below */}
            <div style={{ marginTop: "32px" }}>
              <h3 className="section-subtitle">Featured Scroll</h3>
              <ArtworkScroller artworks={topArtworks.slice(0, 12)} />
            </div>
          </section>

          {/* Top Artists */}
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">🎨 Top Artists</h2>
              {topArtists.length === 0 && (
                <p className="empty-note">No artists to show yet.</p>
              )}
            </div>
            <div className="artist-grid">
              {topArtists.map((artist) => (
                <ArtistCard key={artist._id || artist.id} artist={artist} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default HomePage;
