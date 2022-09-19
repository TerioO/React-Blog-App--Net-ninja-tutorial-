import {useState, useEffect} from 'react';

const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState(null);

    useEffect( () => {

        const abortCont = new AbortController();

        fetch(url, {signal: abortCont.signal})
        .then(res => {
            if(!res.ok){
                throw Error('Could not fetch data for that resource');
            }
            return res.json();
        })
        .then(data => {
            setData(data); 
            setIsFetching(false);
            setError(null);
        })
        .catch(err => {
            if(err.message === "AbortError"){
                console.log('Fetch aborted');
            }
            else {
                setError(err.message);
                setIsFetching(false);
            }
        })

        return () => abortCont.abort();

    }, [url])
    
    return { data, setData, isFetching, error };
};

export default useFetch;
