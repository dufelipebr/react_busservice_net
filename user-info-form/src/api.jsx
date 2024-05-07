////npm install axios

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Api = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Replace with your actual .NET API endpoint URL
    const apiUrl = 'https://your-api-endpoint.com/api/data';

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(apiUrl);
                setData(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [apiUrl]); // Only fetch data on URL change

    // Handle loading, error, and data states in your UI

    return (
        <div>
            {isLoading && <p>Loading data...</p>}
            {error && <p>Error: {error.message}</p>}
            {data && (
                // Render your fetched data here
            )}
        </div>
    );
};

export default Api;