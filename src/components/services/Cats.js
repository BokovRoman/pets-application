import { useState, useEffect } from 'react';
import axios from 'axios';

const Cats = () => {
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchDdata = async () => {
            setError(false);
            setLoading(true);

            try {
                const response = await axios('https://api.thecatapi.com/v1/images/search');
                setData(response.data[0])
                console.log(data);

            } catch (error) {
                setError(true)
            }
            setLoading(false)
        };
        fetchDdata()
    }, []);

    if (isError) return <h1>Error, please try again!</h1>;
    if (isLoading) return <h1>Loading</h1>;
    return (
        <div>
            <img src={data.url} alt="Cat" width={data.width} height={data.height}/>
        </div>
    )
}

export default Cats;