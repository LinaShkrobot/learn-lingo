import { useState, useEffect } from "react";
import { ref, get, child } from "firebase/database";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";
import TeacherCard from "../components/TeacherCard";
import "./TeachersPage.css";

export default function FavoritesPage() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const favoriteIds = JSON.parse(
      localStorage.getItem(`favorites_${user.uid}`) || "[]",
    );

    if (favoriteIds.length === 0) {
      setLoading(false);
      return;
    }

    const fetchFavorites = async () => {
      const dbRef = ref(db);
      const snapshot = await get(child(dbRef, "/"));
      const data = snapshot.val();

      if (data) {
        const allTeachers = Object.entries(data).map(
          ([key, value]: [string, any]) => ({ id: key, ...value }),
        );
        const filtered = allTeachers.filter((t) => favoriteIds.includes(t.id));
        setFavorites(filtered);
      }
      setLoading(false);
    };

    fetchFavorites();
  }, [user]);

  return (
    <div className="teachers-page">
      <div className="teachers-container">
        {loading ? (
          <p>Loading...</p>
        ) : favorites.length === 0 ? (
          <p>No favorite teachers yet.</p>
        ) : (
          <ul className="teachers-list">
            {favorites.map((teacher) => (
              <li key={teacher.id}>
                <TeacherCard teacher={teacher} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
