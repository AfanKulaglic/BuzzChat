import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { RootState } from '../store/store'; // Adjust the path as needed
import { ChatMobile } from '../components/Mobile/ChatMobile';
import { ChatDesktop } from '../components/Desktop/ChatDesktop';
import Loading from './Loading';
import Main from './Main';

interface DataItem {
    _id: string;
    email: string;
    nickname: string;
    image: string;
}

interface ChatParams extends Record<string, string | undefined> {
    nickname?: string; // Use optional if nickname might not be provided
}

const Chat: React.FC = () => {
    const { nickname } = useParams<ChatParams>();
    const [friendData, setFriendData] = useState<DataItem | null>(null);
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
    const [loading, setLoading] = useState<boolean>(true); // Loading state

    // Access user data from Redux store
    const userData = useSelector((state: RootState) => state.user);

    // Fetch data from the server and find the matching friend
    const fetchData = async () => {
        try {
            const response = await axios.get<DataItem[]>('https://buzzchat-1lgf.onrender.com/api/data');
            const data = response.data;

            // Find the friend with the matching nickname
            const matchedFriend = data.find(item => item.nickname === nickname);

            if (matchedFriend) {
                setFriendData(matchedFriend);
                console.log(`Friend Username ${nickname} found in item:`, matchedFriend);
            } else {
                console.log(`No friend found with nickname: ${nickname}`);
                setFriendData(null);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Set loading to false after fetch attempt
        }
    };

    useEffect(() => {
        fetchData();
    }, [nickname]); // Add nickname as a dependency to refetch when it changes

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // Log user data to the console
        console.log('User Data:', userData);
    }, [userData]);

    if (loading) {
        return <Loading />; // Show loading component while loading is true
    }

    return (
        <div>
            {isMobile ? (
                <ChatMobile
                    friendUsername={friendData ? friendData.nickname : undefined}
                    friendImage={friendData ? friendData.image : undefined}
                    userUsername={userData.nickname}
                />
            ) : (
                <>
                    <Main />
                    <ChatDesktop
                        friendUsername={friendData ? friendData.nickname : undefined}
                        friendImage={friendData ? friendData.image : undefined}
                        userUsername={userData.nickname}
                    />
                </>
            )}
        </div>
    );
};

export default Chat;
