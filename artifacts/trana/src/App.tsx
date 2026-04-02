import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import TabLayout from "./components/TabLayout";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import Quiz from "./pages/Quiz";
import Recommendations from "./pages/Recommendations";
import DestinationDetail from "./pages/DestinationDetail";
import Chat from "./pages/Chat";
import Itinerary from "./pages/Itinerary";
import ItineraryDetail from "./pages/ItineraryDetail";
import Auth from "./pages/Auth";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#F8F9FA" }}>
          <Routes>
            <Route element={<TabLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/destination/:id" element={<DestinationDetail />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/itinerary" element={<Itinerary />} />
            <Route path="/itinerary-detail" element={<ItineraryDetail />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
