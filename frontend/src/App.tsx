import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import Main from "./pages/Main";
import Auth from "./pages/Auth";
import SetupProfile from "./pages/SetupProfile";
import Chat from "./pages/Chat";
import AdminDashboard from "./pages/AdminDashboard";
import StartLoading from "./pages/StartLoading";
import AiBot from "./pages/AiBot";
import "./index.css";
import "./styles/Auth.css";
import "./styles/SetupProfile.css";
import "./styles/AppBar.css";
import "./styles/HomeContent.css";
import "./styles/ExploreContent.css";
import "./styles/SettingsContent.css";
import "./styles/ChatMobile.css";

function App() {
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    };
    fetchData();
  }, []);

  if (loading) {
    return <StartLoading />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          user.email ? (
            <Navigate to="/main" state={{ email: user.email }} />
          ) : (
            <Auth />
          )
        }
      />
      <Route path="/setupProfile" element={<SetupProfile />} />
      <Route path="/main" element={<Main />} />
      <Route path="/chat/:nickname" element={<Chat />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/aiBot" element={<AiBot />} />
    </Routes>
  );
}

export default App;
