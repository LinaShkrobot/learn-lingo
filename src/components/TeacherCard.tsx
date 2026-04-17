import { useState } from "react";
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

  return (
    <div className="teacher-card">
      <div className="teacher-avatar">
        <img
          src={teacher.avatar_url}
          alt={`${teacher.name} ${teacher.surname}`}
        />
      </div>
      <div className="teacher-info">
        <div className="teacher-top">
          <span className="teacher-label">Languages</span>
          <span className="teacher-detail">Lessons online</span>
          <span className="teacher-detail">
            Lessons done: {teacher.lessons_done}
          </span>
          <span className="teacher-detail">Rating: {teacher.rating}</span>
          <span className="teacher-price">
            Price / 1 hour: {teacher.price_per_hour}$
          </span>
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
          <span className="field-value">{teacher.lesson_info}</span>
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
                    <span className="reviewer-name">
                      {review.reviewer_name}
                    </span>
                    <span className="reviewer-rating">
                      <svg width="15" height="14">
                        <use href="/sprite.svg#icon-star" />
                      </svg>{" "}
                      {review.reviewer_rating}
                    </span>
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
              {level}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
