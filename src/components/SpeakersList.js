import Speaker from './Speaker';
import { data } from '../../SpeakerData';
import { useState } from 'react';

const SpeakersList = ({showSessions}) => {
    
    const [speakersData, setSpeakersData] = useState(data);
    
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
          <div className="row">
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