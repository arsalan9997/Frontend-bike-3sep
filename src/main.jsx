import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const bikes = [
  { id: 1, name: "Street 900", brand: "Apex", price: "₹1,89,999", type: "Naked", cc: "900 CC", power: "95 HP", image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80" },
  { id: 2, name: "Thunder X", brand: "Velocity", price: "₹2,49,999", type: "Sport", cc: "1000 CC", power: "110 HP", image: "https://images.unsplash.com/photo-1558980664-10ea0d8a9f19?auto=format&fit=crop&w=900&q=80" },
  { id: 3, name: "Urban 500", brand: "Rider", price: "₹1,59,999", type: "Cruiser", cc: "500 CC", power: "48 HP", image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=900&q=80" },
  { id: 4, name: "Falcon 650", brand: "Apex", price: "₹2,19,999", type: "Adventure", cc: "650 CC", power: "72 HP", image: "https://images.unsplash.com/photo-1525160354320-d8e92641c563?auto=format&fit=crop&w=900&q=80" },
  { id: 5, name: "Racer 750", brand: "Velocity", price: "₹2,79,999", type: "Sport", cc: "750 CC", power: "98 HP", image: "https://images.unsplash.com/photo-1517846693594-ea46794ca99d?auto=format&fit=crop&w=900&q=80" },
  { id: 6, name: "Classic 350", brand: "Rider", price: "₹1,39,999", type: "Classic", cc: "350 CC", power: "30 HP", image: "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?auto=format&fit=crop&w=900&q=80" }
];

function App() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const visibleBikes = bikes.filter((bike) => {
    const matchesFilter = filter === "All" || bike.type === filter;
    const matchesSearch = `${bike.name} ${bike.brand} ${bike.type}`.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const bookTestRide = (bike) => {
    alert(`Test ride request received for ${bike.name}! Our showroom team will contact you.`);
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">MOTO<span>VERSE</span></div>
        <div className="navlinks">
          <a href="#home">Home</a>
          <a href="#bikes">Bikes</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </div>
        <a className="nav-btn" href="#bikes">Explore Bikes</a>
      </nav>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">PREMIUM MOTORCYCLES</p>
            <h1>Ride Beyond<br /><span>Limits.</span></h1>
            <p className="hero-text">
              Discover performance, style and technology in our latest collection of premium motorcycles.
            </p>
            <div className="hero-actions">
              <a href="#bikes" className="primary-btn">View Collection →</a>
              <a href="#contact" className="secondary-btn">Book a Test Ride</a>
            </div>
            <div className="stats">
              <div><strong>25+</strong><small>Models</small></div>
              <div><strong>10K+</strong><small>Happy Riders</small></div>
              <div><strong>15</strong><small>Years Experience</small></div>
            </div>
          </div>
          <div className="hero-bike">
            <div className="glow"></div>
            <img src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=85" alt="Premium motorcycle" />
          </div>
        </section>

        <section className="collection" id="bikes">
          <div className="section-head">
            <div>
              <p className="eyebrow">OUR COLLECTION</p>
              <h2>Find Your Perfect Ride</h2>
            </div>
            <input
              className="search"
              placeholder="Search bikes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="filters">
            {["All", "Sport", "Naked", "Cruiser", "Adventure", "Classic"].map((item) => (
              <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>
                {item}
              </button>
            ))}
          </div>

          <div className="bike-grid">
            {visibleBikes.map((bike) => (
              <article className="bike-card" key={bike.id}>
                <div className="bike-image">
                  <img src={bike.image} alt={bike.name} />
                  <span className="badge">{bike.type}</span>
                </div>
                <div className="bike-info">
                  <p>{bike.brand}</p>
                  <h3>{bike.name}</h3>
                  <div className="specs">
                    <span>{bike.cc}</span><span>{bike.power}</span>
                  </div>
                  <div className="price-row">
                    <strong>{bike.price}</strong>
                    <button onClick={() => setSelected(bike)}>Details</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="services" id="services">
          <div className="section-head">
            <div>
              <p className="eyebrow">WHY MOTOVERSE</p>
              <h2>Everything You Need</h2>
            </div>
          </div>
          <div className="service-grid">
            <div className="service-card"><span>🏍️</span><h3>Test Rides</h3><p>Experience your dream motorcycle before you buy.</p></div>
            <div className="service-card"><span>🔧</span><h3>Expert Service</h3><p>Certified technicians and genuine spare parts.</p></div>
            <div className="service-card"><span>💳</span><h3>Easy Finance</h3><p>Flexible financing options with quick approval.</p></div>
            <div className="service-card"><span>🛡️</span><h3>Warranty</h3><p>Comprehensive warranty and roadside assistance.</p></div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div>
            <p className="eyebrow">READY TO RIDE?</p>
            <h2>Book Your Test Ride Today.</h2>
            <p>Visit our showroom and get behind the handlebars.</p>
          </div>
          <button className="primary-btn" onClick={() => alert("Test ride booking form coming next!")}>Book a Test Ride →</button>
        </section>
      </main>

      <footer>
        <div className="logo">MOTO<span>VERSE</span></div>
        <p>© 2026 MotoVerse Bike Showroom. Built with React + Node.js.</p>
      </footer>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setSelected(null)}>×</button>
            <img src={selected.image} alt={selected.name} />
            <p className="eyebrow">{selected.brand} • {selected.type}</p>
            <h2>{selected.name}</h2>
            <p className="modal-price">{selected.price}</p>
            <p>Engine: {selected.cc} &nbsp; | &nbsp; Power: {selected.power}</p>
            <button className="primary-btn" onClick={() => bookTestRide(selected)}>Book Test Ride</button>
          </div>
        </div>
      )}
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
