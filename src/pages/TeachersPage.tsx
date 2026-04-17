import { useState, useEffect } from "react";
import {
  ref,
  query,
  orderByKey,
  limitToFirst,
  startAfter,
  get,
} from "firebase/database";
import { db } from "../firebase/config";
import TeacherCard from "../components/TeacherCard";
import "./TeachersPage.css";

const PAGE_SIZE = 4;

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchTeachers = async () => {
    let teachersQuery;

    if (lastKey) {
      teachersQuery = query(
        ref(db, "/"),
        orderByKey(),
        startAfter(lastKey),
        limitToFirst(PAGE_SIZE),
      );
    } else {
      teachersQuery = query(
        ref(db, "/"),
        orderByKey(),
        limitToFirst(PAGE_SIZE),
      );
    }

    const snapshot = await get(teachersQuery);
    const data = snapshot.val();

    if (data) {
      const entries = Object.entries(data);
      const newTeachers = entries.map(([key, value]: [string, any]) => ({
        id: key,
        ...value,
      }));

      setTeachers((prev) => [...prev, ...newTeachers]);
      setLastKey(entries[entries.length - 1][0]);

      if (entries.length < PAGE_SIZE) {
        setHasMore(false);
      }
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    const loadInitial = async () => {
      const teachersQuery = query(
        ref(db, "/"),
        orderByKey(),
        limitToFirst(PAGE_SIZE),
      );
      const snapshot = await get(teachersQuery);
      const data = snapshot.val();

      if (data) {
        const entries = Object.entries(data);
        const newTeachers = entries.map(([key, value]: [string, any]) => ({
          id: key,
          ...value,
        }));
        setTeachers(newTeachers);
        setLastKey(entries[entries.length - 1][0]);
        if (entries.length < PAGE_SIZE) {
          setHasMore(false);
        }
      }
    };

    loadInitial();
  }, []);

  return (
    <div className="teachers-container">
      <ul className="teachers-list">
        {teachers.map((teacher) => (
          <li key={teacher.id}>
            <TeacherCard teacher={teacher} />
          </li>
        ))}
      </ul>
      {hasMore && (
        <button className="load-more" onClick={fetchTeachers}>
          Load more
        </button>
      )}
    </div>
  );
}
