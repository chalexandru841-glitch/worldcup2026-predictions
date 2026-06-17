import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/layout/Layout";
import PageTransition from "./components/common/PageTransition";
import HomePage from "./pages/HomePage";
import PredictionsPage from "./pages/PredictionsPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import BracketPage from "./pages/BracketPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<PageTransition><HomePage /></PageTransition>} />
          <Route path="predictions" element={<PageTransition><PredictionsPage /></PageTransition>} />
          <Route path="leaderboard" element={<PageTransition><LeaderboardPage /></PageTransition>} />
          <Route path="bracket" element={<PageTransition><BracketPage /></PageTransition>} />
          <Route path="profile" element={<PageTransition><ProfilePage /></PageTransition>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
