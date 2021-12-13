import Speaker from './Speaker';
import { data } from '../../SpeakerData';
import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import ReactPlaceholder from 'react-placeholder/lib';

const SpeakersList = ({showSessions}) => {
    
    const [speakersData, setSpeakersData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasErrored, setHasErrored] = useState(false);
    const [error, setError] = useState("");
    
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    useEffect(() => {
        async function delayFunc() {
            try {
                await delay(2000);
                // throw "Had Error ."
                setIsLoading(false);
                setSpeakersData(data);
            }
            catch (e) {
                setIsLoading(false);
                setHasErrored(true);
                setError(e);
            }
        }
        delayFunc();
    }, []);

    if (hasErrored === true) {
        return (
            <div className="text-danger">Error:<b> loading Speaker Data Failed</b></div>
        );
    }

    const onFavoriteToggle = (id) => {
    
        const speakersRecPrevious = speakersData.find((rec) => {
            return rec.id === id;
        });
    
        const speakersRecUpdated = {
            ...speakersRecPrevious,
            favorite: !speakersRecPrevious.favorite
        };
    
        const speakersDataNew = speakersData.map((rec) => {
            return rec.id === id ? speakersRecUpdated : rec;
        });
    
        setSpeakersData(speakersDataNew);
    }

    return (
        <div className='container speakers-list'>
            {/* <ReactPlaceholder type="media" rows={15} className="speakerslist-placeholder"
                ready={isLoading === false}/> DIS SHIT BROKE */}
            <div className="row">
                <LoadingSpinner isLoading={isLoading}/>
              {speakersData.map((speaker) => {
                    return(<Speaker key={speaker.id} 
                        speaker={speaker} 
                        showSessions={showSessions}
                        onFavoriteToggle={()=> {
                            onFavoriteToggle(speaker.id);
                        }} />);
            })}
            </div>
         </div>
    );
}



export default SpeakersList;