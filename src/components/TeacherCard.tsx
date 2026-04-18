import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import "./TeacherCard.css";

interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

interface Teacher {
  id: string;
  name: string;
  surname: string;
  languages: string[];
  levels: string[];
  rating: number;
  reviews: Review[];
  price_per_hour: number;
  lessons_done: number;
  avatar_url: string;
  lesson_info: string;
  conditions: string[];
  experience: string;
}

interface TeacherCardProps {
  teacher: Teacher;
}

export default function TeacherCard({ teacher }: TeacherCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (user) {
      const favorites = JSON.parse(
        localStorage.getItem(`favorites_${user.uid}`) || "[]",
      );
      setIsFavorite(favorites.includes(teacher.id));
    }
  }, [user, teacher.id]);

  const handleFavorite = () => {
    if (!user) {
      alert("This feature is available only for authorized users!");
      return;
    }

    const favorites = JSON.parse(
      localStorage.getItem(`favorites_${user.uid}`) || "[]",
    );

    if (isFavorite) {
      const updated = favorites.filter((id: string) => id !== teacher.id);
      localStorage.setItem(`favorites_${user.uid}`, JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      favorites.push(teacher.id);
      localStorage.setItem(`favorites_${user.uid}`, JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  return (
    <div className="teacher-card">
      <div className="teacher-avatar">
        <div className="avatar-wrapper">
          <img
            src={teacher.avatar_url}
            alt={`${teacher.name} ${teacher.surname}`}
          />
          <svg className="online-dot" width="12" height="12">
            <use href="/sprite.svg#icon-online" />
          </svg>
        </div>
      </div>
      <div className="teacher-info">
        <div className="teacher-top">
          <span className="teacher-label">Languages</span>
          <span className="teacher-detail">
            <svg className="icon-book" width="16" height="16">
              <use href="/sprite.svg#icon-book" />
            </svg>
            Lessons online
          </span>
          <span className="teacher-detail">
            Lessons done: {teacher.lessons_done}
          </span>
          <span className="teacher-detail">
            <svg className="icon-star" width="15" height="14">
              <use href="/sprite.svg#icon-star" />
            </svg>
            Rating: {teacher.rating}
          </span>
          <span className="teacher-price">
            Price / 1 hour:{" "}
            <span className="price-value">{teacher.price_per_hour}$</span>
          </span>
          <button
            className={`heart-btn ${isFavorite ? "active" : ""}`}
            onClick={handleFavorite}
          >
            <svg width="26" height="26">
              <use href="/sprite.svg#icon-heart" />
            </svg>
          </button>
        </div>
        <h2 className="teacher-name">
          {teacher.name} {teacher.surname}
        </h2>
        <p className="teacher-field">
          <span className="field-label">Speaks:</span>
          <span className="field-value underline">
            {teacher.languages.join(", ")}
          </span>
        </p>
        <p className="teacher-field">
          <span className="field-label">Lesson Info:</span>
          <span className="field-value faded">{teacher.lesson_info}</span>
        </p>
        <p className="teacher-field">
          <span className="field-label">Conditions:</span>
          <span className="field-value">{teacher.conditions.join(" ")}</span>
        </p>

        {!expanded && (
          <button className="read-more" onClick={() => setExpanded(true)}>
            Read more
          </button>
        )}

        {expanded && (
          <div className="teacher-expanded">
            <p className="teacher-experience">{teacher.experience}</p>
            <ul className="teacher-reviews">
              {teacher.reviews.map((review, i) => (
                <li key={i} className="review-item">
                  <div className="review-header">
                    <div className="reviewer-avatar">
                      {review.reviewer_name.charAt(0)}
                    </div>
                    <div className="reviewer-info">
                      <span className="reviewer-name">
                        {review.reviewer_name}
                      </span>
                      <span className="reviewer-rating">
                        <svg className="icon-star" width="16" height="16">
                          <use href="/sprite.svg#icon-star" />
                        </svg>
                        {review.reviewer_rating}
                      </span>
                    </div>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        <ul className="teacher-levels">
          {teacher.levels.map((level, i) => (
            <li key={i} className="level-badge">
              #{level}
            </li>
          ))}
        </ul>
        <button className="book-btn">Book trial lesson</button>
      </div>
    </div>
  );
}
