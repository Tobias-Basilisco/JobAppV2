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
            'X-RapidAPI-Key': '08fa32e7e4msh5bb8d5c28ba24cfp1a9f08jsnd5ffffefeb4b',
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