import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/userSlice";
import { ExploreContentMobile } from "../components/Mobile/Main/ExploreContentMobile";
import AppBarDesktop from "../components/Desktop/Main/AppBarDesktop";
import Loading from "./Loading";
import NavigationMobile from "../components/Mobile/Main/NavigationMobile";
import { HomeContentMobile } from "../components/Mobile/Main/HomeContentMobile";
import { SettingsContentMobile } from "../components/Mobile/Main/SettingsContentMobile";
import AppBarMobile from "../components/Mobile/Main/AppBarMobile";
import { RootState } from "../store/store";
import NavigationDesktop from "../components/Desktop/Main/NavigationDesktop";
import { NaHomeContentDesktop } from "../components/Desktop/Main/HomeContentDesktop";
import { ExploreContentDesktop } from "../components/Desktop/Main/ExploreContentDesktop";
import { SettingsContentDesktop } from "../components/Desktop/Main/SettingsContentDesktop";

interface DataItem {
  _id: string;
  email: string;
  nickname: string;
  image: string;
  messages: Message[];
}

interface Message {
  _id: string;
  user: string;
  content: string;
  timestamp: Date;
  toUser: string;
}

const Main: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storedUser = useSelector((state: RootState) => state.user);

  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  const [activeTab, setActiveTab] = useState<number>(0);

  const email = location.state?.email || storedUser.email;

  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email, navigate]);

  const fetchData = async () => {
    try {
      const response = await axios.get<DataItem[]>(
        "https://buzzchat-beo9.onrender.com/api/data"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (email && data.length > 0) {
      const matchedItem = data.find((item) => item.email === email);
      if (matchedItem) {
        dispatch(setUser(matchedItem));
      } else {
        console.log("No matching email found.");
      }
    }
  }, [data, email, dispatch]);

  useEffect(() => {
    if (activeTab === 0) {
      fetchData();
    }
  }, [activeTab]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {isMobile ? (
        <div style={{ height: "100vh" }}>
          <AppBarMobile
            userName={
              data.find((item) => item.email === email)?.nickname || "Guest"
            }
            userImage={
              data.find((item) => item.email === email)?.image ||
              "https://cdn.pixabay.com/photo/2016/03/08/20/03/flag-1244649_1280.jpg"
            }
            currentDate={new Intl.DateTimeFormat("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            }).format(new Date())}
            data={data}
            onTabChange={setActiveTab}
          />
          {activeTab === 0 && (
            <HomeContentMobile
              userName={
                data.find((item) => item.email === email)?.nickname || "Guest"
              }
              data={data}
              onTabChange={setActiveTab}
            />
          )}
          {activeTab === 1 && (
            <ExploreContentMobile
              userName={
                data.find((item) => item.email === email)?.nickname || "Guest"
              }
              userImage={
                data.find((item) => item.email === email)?.image ||
                "https://cdn.pixabay.com/photo/2016/03/08/20/03/flag-1244649_1280.jpg"
              }
              data={data}
            />
          )}
          {activeTab === 2 && (
            <SettingsContentMobile
              userImage={
                data.find((item) => item.email === email)?.image ||
                "https://cdn.pixabay.com/photo/2016/03/08/20/03/flag-1244649_1280.jpg"
              }
              userId={
                data.find((item) => item.email === email)?._id ||
                "https://cdn.pixabay.com/photo/2016/03/08/20/03/flag-1244649_1280.jpg"
              }
            />
          )}
          <NavigationMobile onTabChange={setActiveTab} activeTab={activeTab} />
        </div>
      ) : (
        <>
          <AppBarDesktop
            userName={
              data.find((item) => item.email === email)?.nickname || "Guest"
            }
            userImage={
              data.find((item) => item.email === email)?.image ||
              "https://cdn.pixabay.com/photo/2016/03/08/20/03/flag-1244649_1280.jpg"
            }
            currentDate={new Intl.DateTimeFormat("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            }).format(new Date())}
            data={data}
            onTabChange={setActiveTab}
          />
          {activeTab === 0 && (
            <NaHomeContentDesktop
              userName={
                data.find((item) => item.email === email)?.nickname || "Guest"
              }
              data={data}
              onTabChange={setActiveTab}
            />
          )}
          {activeTab === 1 && (
            <ExploreContentDesktop
              userName={
                data.find((item) => item.email === email)?.nickname || "Guest"
              }
              userImage={
                data.find((item) => item.email === email)?.image ||
                "https://cdn.pixabay.com/photo/2016/03/08/20/03/flag-1244649_1280.jpg"
              }
              data={data}
            />
          )}
          {activeTab === 2 && (
            <SettingsContentDesktop
              userImage={
                data.find((item) => item.email === email)?.image ||
                "https://cdn.pixabay.com/photo/2016/03/08/20/03/flag-1244649_1280.jpg"
              }
              userId={
                data.find((item) => item.email === email)?._id ||
                "https://cdn.pixabay.com/photo/2016/03/08/20/03/flag-1244649_1280.jpg"
              }
            />
          )}
          <div className="empty-conversation">
            <p>
              {" "}
              <img src="/conversation.png" /> Your Messages{" "}
              <span>Send a message to start a chat</span>
            </p>
          </div>
          <NavigationDesktop onTabChange={setActiveTab} activeTab={activeTab} />
        </>
      )}
    </div>
  );
};

export default Main;
