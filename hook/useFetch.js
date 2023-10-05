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
          'X-RapidAPI-Key': 'd0e9aa5e6emsh60ca601a91e35c7p1cbf55jsn05d4f1d86e71',
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