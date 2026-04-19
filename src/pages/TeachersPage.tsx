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
import Filters from "../components/Filters";
import Button from "../components/Button";
import "./TeachersPage.css";

const PAGE_SIZE = 4;

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({
    language: "",
    level: "",
    price: "",
  });

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

  const filteredTeachers = teachers.filter((teacher) => {
    if (filters.language && !teacher.languages.includes(filters.language))
      return false;
    if (filters.level && !teacher.levels.includes(filters.level)) return false;
    if (filters.price && teacher.price_per_hour > Number(filters.price))
      return false;
    return true;
  });

  return (
    <div className="teachers-page">
      <div className="teachers-container">
        <Filters onFilter={setFilters} />
        <ul className="teachers-list">
          {filteredTeachers.map((teacher) => (
            <li key={teacher.id}>
              <TeacherCard teacher={teacher} />
            </li>
          ))}
        </ul>
        {hasMore && (
          <Button onClick={fetchTeachers} className="load-more">
            Load more
          </Button>
        )}
      </div>
    </div>
  );
}
