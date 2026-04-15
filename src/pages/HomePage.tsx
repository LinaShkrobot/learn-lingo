import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="container">
      <section className="hero">
        <div className="hero-left">
          <h1>
            Unlock your potential with the best
            <span className="highlight">language</span> tutors
          </h1>
          <p className="hero-text">
            Embark on an Exciting Language Journey with Expert Language Tutors:
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </p>
          <button className="get-started-btn">Get started</button>
        </div>
        <div className="hero-right">
          <img src="/hero.webp" alt="Language tutor" />
        </div>
      </section>
      <section className="stats">
        <ul className="stats-list">
          <li className="stats-item">
            <span className="stats-number">32,000 +</span>
            <span className="stats-text">Experienced tutors</span>
          </li>
          <li className="stats-item">
            <span className="stats-number">300,000 +</span>
            <span className="stats-text">5-star tutor reviews</span>
          </li>
          <li className="stats-item">
            <span className="stats-number">120 +</span>
            <span className="stats-text">Subjects taught</span>
          </li>
          <li className="stats-item">
            <span className="stats-number">200 +</span>
            <span className="stats-text">Tutor nationalities</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
