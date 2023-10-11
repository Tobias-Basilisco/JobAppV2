import {useState, useEffect} from 'react';
import axios from 'axios';
import { API_KEYS } from '@env';


const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const APIKeys = ['1275e6d03fmsh976127f77d23ccap154125jsnd8e5c35799fc',
    'b781425ad4mshb3e4c64a0aa8807p12b3fajsn93e405a04ae2',

    ];
    const apiKeys = API_KEYS.split(',');

    const XRapidAPIKey = apiKeys[Math.floor(Math.random() * apiKeys.length)];
    // console.log('key: ' +XRapidAPIKey);
    console.log('key : ' + XRapidAPIKey);


    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
            'X-RapidAPI-Key': XRapidAPIKey,
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