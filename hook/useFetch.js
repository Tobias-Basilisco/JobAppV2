import {useState, useEffect} from 'react';
import axios from 'axios';


const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
            'X-RapidAPI-Key': '1275e6d03fmsh976127f77d23ccap154125jsnd8e5c35799fc',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        },
        params: { ... query },
    };

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.request(options);
            setData(response.data.data);
            setIsLoading(false);

        } catch (error) {
            setError(error);
            alert('there is an error');
            setIsLoading(false);

        }
    }

    useEffect (() => {
        fetchData();

    }, []);
    
    const refetch = () => {
        setIsLoading(true);
        fetchData();

    }

    return { data, isLoading, error, refetch };
    
}

export default useFetch;