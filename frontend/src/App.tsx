import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import PredictionsPage from "./pages/PredictionsPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import BracketPage from "./pages/BracketPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="predictions" element={<PredictionsPage />} />
        <Route path="leaderboard" element={<LeaderboardPage />} />
        <Route path="bracket" element={<BracketPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}