import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TeachersPage from "./pages/TeachersPage";
import FavoritesPage from "./pages/FavoritesPage";
import PrivateRoute from "./components/PrivateRoute";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";

export default function App() {
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
