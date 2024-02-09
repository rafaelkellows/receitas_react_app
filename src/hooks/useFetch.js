import {useState, useEffect} from "react";

// Custom Hook
export const useFetch = (url) => {
    const [data, setData] = useState(null);
    
    // Refaturando Post
    const [config, setConfig] = useState(null);
    const [method, setMethod] = useState(null);
    const [callFetch, setCallFetch] = useState(false);
    
    const [loading, setLoading] = useState(false);
    
    const [error, setError] = useState(null);

    const [itemID, setItemId] = useState(null);
    const [msgReturn, setMsgReturn] = useState("");
    const [statusReturn, setStatusReturn] = useState(false);
    
    // httpConfig
    const httpConfig = (data, method) => {
        if(method==="POST"){
            setConfig({
                method,
                headers: { "Content-Type":"application/json",},
                body: JSON.stringify(data),
            });
        }else if(method==="DELETE"){
            setConfig({
                method,
                headers: { "Content-Type":"application/json",},
            });
        }
        setMethod(method);
        setItemId(data);
    };
    
    // fetchData
    useEffect(() => {
        const fetchData = async() => {
            //Loader
            setLoading(true);
            //Try
            try{
                const res = await fetch(url);
                const json = await res.json();
                setData(json);
            }catch(error){
                //console.log(error.message);
                setError(error.message);
            };
            setLoading(false);
        };
        fetchData();
    },[url, callFetch]);

    // httpRequest
    useEffect(()=>{
        const httpRequest = async() => {
            let json;
            if(method==='POST'){
                let fetchOptions = [url, config];
                const res = await fetch(...fetchOptions);
                json = await res.json();
                setCallFetch(json);
                setMsgReturn(`${itemID.name}`);
                setStatusReturn(true);
            }else if(method==='DELETE'){
                const deleteURL = `${url}/${itemID}`;
                const res = await fetch(deleteURL, config);
                json = await res.json();
                setMsgReturn(`${itemID}`);
                setStatusReturn(false);
                setCallFetch(json);
            }
    
        };
        httpRequest();
    },[config, method, url]);


    return{ data, httpConfig, loading, error, msgReturn, statusReturn};
}