// import { data } from "../SpeakerData";
import { useState, useEffect } from "react";

export const REQUEST_STATUS = {
    LOADING: "loading",
    SUCCESS: "success",
    FAILURE: "failure",
};

const useRequestDelay = (delayTime = 1000, initialData=[]) => {
    
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
    const [error, setError] = useState("");
    
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    useEffect(() => {
        async function delayFunc() {
            try {
                await delay(delayTime);
                // throw "Had Error ."
                setRequestStatus(REQUEST_STATUS.SUCCESS);
                setData(initialData);
            }
            catch (e) {
                setRequestStatus(REQUEST_STATUS.FAILURE);
                setError(e);
            }
        }
        delayFunc();
    }, []);
     
     const updateRecord = (record, doneCallback) => {
        
        const originalRecords = [...data];
        
        const newRecords = data.map((rec) => {
            return rec.id === record.id ? record : rec;
        });

    async function delayFunction() {
            try {
                setData(newRecords);
                await delay(delayTime);
                if (doneCallback){
                    doneCallback();
                }
            }
            catch (e)
            {
                console.log("error thrown inside delayFunction", error);
                if (doneCallback) {
                    doneCallback()
                }
                setData(originalRecords);
            }
        }
        delayFunction();
    }

    const deleteRecord = (record, doneCallback) => {
        
        const originalRecords = [...data];
        
         const newRecords = data.filter((rec) => {
             return rec.id != record.id;
        });

        async function delayFunction() {
            try {
                setData(newRecords);
                await delay(delayTime);
                if (doneCallback){
                    doneCallback();
                }
            }
            catch (e)
            {
                console.log("error thrown inside delayFunction", error);
                if (doneCallback) {
                    doneCallback()
                }
                setData(originalRecords);
            }
        }
        delayFunction();
    }
    
    const insertRecord = (record, doneCallback) => {
        
        const originalRecords = [...data];
        
        const newRecords = [record, ...data];

        async function delayFunction() {
            try {
                setData(newRecords);
                await delay(delayTime);
                if (doneCallback){
                    doneCallback();
                }
            }
            catch (e)
            {
                console.log("error thrown inside delayFunction", error);
                if (doneCallback) {
                    doneCallback()
                }
                setData(originalRecords);
            }
        }
        delayFunction();
    }

    // const onFavoriteToggle = (id) => {
    
    //     const speakersRecPrevious = speakersData.find((rec) => {
    //         return rec.id === id;
    //     });
    
    //     const speakersRecUpdated = {
    //         ...speakersRecPrevious,
    //         favorite: !speakersRecPrevious.favorite
    //     };
    
    //     const speakersDataNew = speakersData.map((rec) => {
    //         return rec.id === id ? speakersRecUpdated : rec;
    //     });
    
    //     setSpeakersData(speakersDataNew);
    // }
        
    return {
        data, requestStatus, error, updateRecord, insertRecord, deleteRecord
    };
}
export default useRequestDelay;