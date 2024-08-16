import React, { useEffect, useState } from 'react';
import AppBarMobile from '../components/Mobile/Main/AppBarMobile';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice'; // Adjust the path as necessary
import { MainContentMobile } from '../components/Mobile/Main/MainContentMobile';
import { AppBarDesktop } from '../components/Desktop/Main/AppBarDesktop';
import { MainContentDesktop } from '../components/Desktop/Main/MainContentDesktop';
import Loading from './Loading';
import NavigationMobile from '../components/Mobile/Main/NavigationMobile';
import { FavouritesContentMobile } from '../components/Mobile/Main/FavouritesContentMobile';

interface DataItem {
    _id: string;
    email: string;
    nickname: string;
    image: string;
}

const Main: React.FC = () => {
    const location = useLocation();
    const email = location.state?.email;
    const [data, setData] = useState<DataItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Loading state
    const dispatch = useDispatch();
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
    const [activeTab, setActiveTab] = useState<number>(0); // New state for active tab

    const fetchData = async () => {
        try {
            const response = await axios.get<DataItem[]>('https://backend-fgom.onrender.com/api/data');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Set loading to false once data fetching is complete
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (email && data.length > 0) {
            const matchedItem = data.find(item => item.email === email);
            if (matchedItem) {
                dispatch(setUser(matchedItem));
            } else {
                console.log('No matching email found.');
            }
        }
    }, [data, email, dispatch]);

    // Handle window resize to update screen size
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (loading) {
        return <Loading />; // Show loading component while loading is true
    }

    return (
        <div>
            {isMobile ? (
                <div style={{height:'100vh',border:'2px solid red'}}>
                    <AppBarMobile
                        userName={data.find(item => item.email === email)?.nickname || 'Guest'}
                        userImage={data.find(item => item.email === email)?.image || 'https://cdn.pixabay.com/photo/2016/03/08/20/03/flag-1244649_1280.jpg'}
                        currentDate={new Intl.DateTimeFormat('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric'
                        }).format(new Date())}
                        data={data}
                    />
                    {activeTab === 0 && (
                        <MainContentMobile
                            userName={data.find(item => item.email === email)?.nickname || 'Guest'}
                            userImage={data.find(item => item.email === email)?.image || 'https://cdn.pixabay.com/photo/2016/03/08/20/03/flag-1244649_1280.jpg'}
                            data={data}
                        />
                    )}
                    {activeTab === 1 && <FavouritesContentMobile />}
                    {/* {activeTab === 2 && <NearbyContentMobile />}  Add this if you have a component for "Nearby" content */}
                    <NavigationMobile onTabChange={setActiveTab} activeTab={activeTab} />
                </div>
            ) : (
                <>
                    <AppBarDesktop />
                    <MainContentDesktop />
                </>
            )}
        </div>
    );
};

export default Main;
