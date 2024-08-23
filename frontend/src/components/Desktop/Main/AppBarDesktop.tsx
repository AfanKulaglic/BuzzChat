import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Switch } from '@mui/material';

interface DataItem {
    _id: string;
    email: string;
    nickname: string;
    image: string;
}

interface AppBarDesktopProps {
    userName: string;
    userImage: string; // Path to user's image
    currentDate: string; // Date in string format
    data: DataItem[]; // Array of data items
    onTabChange: (newValue: number) => void; // Callback for changing tabs
}

const AppBarDesktop: React.FC<AppBarDesktopProps> = ({ userName, userImage, currentDate, data, onTabChange }) => {
    const [searchInput, setSearchInput] = useState('');
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('darkMode') === 'true';
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark-mode');
        } else {
            document.documentElement.classList.remove('dark-mode');
        }
    }, [darkMode]);

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };

    const handleResultClick = (nickname: string) => {
        navigate(`/chat/${nickname}`);
    };

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('darkMode', newDarkMode.toString());
    };

    const filteredData = data.filter(item =>
        item.nickname.toLowerCase().includes(searchInput.toLowerCase()) &&
        item.nickname.toLowerCase() !== userName.toLowerCase()
    );

    const handleImageClick = () => {
        onTabChange(2); // Postavlja tab na 1 kad se slika klikne
    };

    return (
        <div className="app-bar-mobile-container app-bar-mobile-container-desktop">
            <div className="app-bar-mobile-top-section">
                <div className="app-bar-mobile-left-section">
                    <img
                        src={userImage}
                        alt={userName}
                        className="app-bar-mobile-user-image"
                        onClick={handleImageClick} // Dodaje funkcionalnost za promenu taba
                    />
                    <span className="app-bar-mobile-user-name">{userName}</span>
                </div>
                <div className="app-bar-mobile-right-section">
                    <span className="app-bar-mobile-date-display">{currentDate}</span>
                    <Switch checked={darkMode} onChange={toggleDarkMode} />
                </div>
            </div>
            <div className="app-bar-mobile-search-container">
                <input
                    type="text"
                    id="app-bar-mobile-search-input"
                    placeholder="🔍 Search"
                    value={searchInput}
                    onChange={handleSearchInputChange}
                />
                {searchInput && (
                    <div className="app-bar-mobile-search-results">
                        {filteredData.map(item => (
                            <div
                                key={item._id}
                                className="app-bar-mobile-search-result-item"
                                onClick={() => handleResultClick(item.nickname)}
                            >
                                <img
                                    src={item.image}
                                    alt={`${item.nickname} icon`}
                                    className="app-bar-mobile-nickname-icon"
                                />
                                <span className="app-bar-mobile-search-result-name">{item.nickname}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppBarDesktop;
