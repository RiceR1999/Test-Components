import Speaker from './Speaker';
import { data } from '../../SpeakerData';
import { useState, useEffect, useContext } from 'react';
import LoadingSpinner from './LoadingSpinner';
import ReactPlaceholder from 'react-placeholder/lib';
import useRequestDelay, { REQUEST_STATUS } from '../../hooks/useRequestDelay';
import { SpeakerFilterContext } from '../../context/SpeakerFilterContext';


const SpeakersList = () => {
    
    const {
        data: speakersData, requestStatus, error,
        updateRecord
    } = useRequestDelay(2000, data);

    const { searchQuery, eventYear } = useContext(SpeakerFilterContext);

      if (requestStatus === REQUEST_STATUS.FAILURE) {
        return (
            <div className="text-danger">Error:<b> loading Speaker Data Failed</b></div>
        );
    }
    return (
        <div className='container speakers-list'>
            <div className="row">
                <LoadingSpinner requestStatus={requestStatus}/>
                {speakersData
                    .filter((speaker) => {
                        return (
                            speaker.first.toLowerCase().includes(searchQuery) ||
                            speaker.last.toLowerCase().includes(searchQuery)
                        );
                    })
                    .filter((speaker) => {
                        return speaker.sessions.find((session) => {
                            return eventYear === session.eventYear;
                        })
                    })
                    
                    .map((speaker) => {
                    return(<Speaker key={speaker.id} 
                        speaker={speaker} 
                        onFavoriteToggle={(doneCallback) => {
                            updateRecord({
                                ...speaker,
                                favorite: !speaker.favorite,
                            }, doneCallback)
                        }} />);
            })}
            </div>
         </div>
    );
}



export default SpeakersList;