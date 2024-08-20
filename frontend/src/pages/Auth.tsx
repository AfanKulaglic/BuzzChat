import { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import AuthMobile from '../components/Mobile/AuthMobile';
import AuthDesktop from '../components/Desktop/AuthDesktop';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

const AuthPage = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
    const [loading, setLoading] = useState<boolean>(false); // Loading state
    const navigate = useNavigate();

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true); // Set loading to true
        try {
            const response = await axios.post('https://chattappbuzz.onrender.com/api/login', {
                email,
                password,
            });
            console.log('Login successful:', response.data);
            navigate('/main', { state: { email } });
            setError(null);
        } catch (err) {
            console.error('Error logging in:', err);
            setError('Error logging in');
        } finally {
            if (!error) {
                setLoading(false); // Set loading to false if no error
            }
        }
    };

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true); // Set loading to true
        try {
            await axios.post('https://chattappbuzz.onrender.com/api/register', {
                email,
                password,
            });
            setEmail('');
            setPassword('');
            setError(null);
            alert('Registration successful');
            navigate('/setupProfile', { state: { email } });
        } catch (err) {
            console.error('Error registering user:', err);
            setError('Error registering user');
        } finally {
            if (!error) {
                setLoading(false); // Set loading to false if no error
            }
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className='auth-page'>
            {loading && !error ? (
                <Loading />
            ) : isMobile ? (
                <AuthMobile
                    email={email}
                    password={password}
                    error={error}
                    isLogin={isLogin}
                    setEmail={setEmail}
                    setPassword={setPassword}
                    setIsLogin={setIsLogin}
                    handleLogin={handleLogin}
                    handleRegister={handleRegister}
                />
            ) : (
                <AuthDesktop />
            )}
        </div>
    );
};

export default AuthPage;
