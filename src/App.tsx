import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import TeachersPage from "./pages/TeachersPage";
import FavoritesPage from "./pages/FavoritesPage";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";

export default function App() {
  const { loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <BrowserRouter>
      <Header />
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
