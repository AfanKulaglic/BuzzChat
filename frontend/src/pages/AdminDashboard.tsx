import { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';

interface DataItem {
    _id: string;
    field1: string;
    field2: string;
    nickname: string;
    image: string;
}

const AdminDashboard = () => {
    const [field1, setField1] = useState<string>('');
    const [field2, setField2] = useState<string>('');
    const [data, setData] = useState<DataItem[]>([]);

    const fetchData = async () => {
        try {
            const response = await axios.get<DataItem[]>('https://buzzchat-beo9.onrender.com/api/data');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDataSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post<DataItem>('https://buzzchat-beo9.onrender.com/api/data', {
                field1,
                field2,
            });
            setData([...data, response.data]);
            setField1('');
            setField2('');
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`https://buzzchat-beo9.onrender.com/api/data/${id}`);
            setData(data.filter(item => item._id !== id));
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    return (
        <div>
            <h1>AdminDashboard Page</h1>
            
            <form onSubmit={handleDataSubmit}>
                <input
                    type="text"
                    placeholder="Field 1"
                    value={field1}
                    onChange={(e) => setField1(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Field 2"
                    value={field2}
                    onChange={(e) => setField2(e.target.value)}
                    required
                />
                <button type="submit">Submit Data</button>
            </form>

            <ul>
                {data.map((item) => (
                    <li key={item._id}>
                        {item.field1} - {item.nickname}
                        {item.image && (
                            <img src={item.image} alt={item.nickname} style={{ width: '100px', height: 'auto' }} />
                        )}
                        <button onClick={() => handleDelete(item._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminDashboard;
