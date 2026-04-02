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
import ReadyToBook from "./pages/ReadyToBook";
import Auth from "./pages/Auth";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div
          style={{
            width: "100%",
            maxWidth: 430,
            height: "100vh",
            maxHeight: 932,
            display: "flex",
            flexDirection: "column",
            background: "#F8F9FA",
            position: "relative",
            overflow: "hidden",
            borderRadius: 40,
            boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 10px #2a2a3e, 0 0 0 12px #111",
          }}
        >
          <Routes>
            {/* Routes WITH bottom nav */}
            <Route element={<TabLayout />}>
              <Route path="/discover" element={<Discover />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/recommendations" element={<Recommendations />} />
              <Route path="/destination/:id" element={<DestinationDetail />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/itinerary-detail" element={<ItineraryDetail />} />
              <Route path="/book" element={<ReadyToBook />} />
            </Route>
            {/* Routes WITHOUT bottom nav */}
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/itinerary" element={<Itinerary />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
