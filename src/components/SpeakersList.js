import Speaker from './Speaker';
import { data } from '../../SpeakerData';
import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import ReactPlaceholder from 'react-placeholder/lib';
import useRequestDelay, { REQUEST_STATUS } from '../../hooks/useRequestDelay';


const SpeakersList = ({showSessions}) => {
    
    const {
        data: speakersData, requestStatus, error,
        updateRecord
    } = useRequestDelay(2000, data);

      if (requestStatus === REQUEST_STATUS.FAILURE) {
        return (
            <div className="text-danger">Error:<b> loading Speaker Data Failed</b></div>
        );
    }
    return (
        <div className='container speakers-list'>
            <div className="row">
                <LoadingSpinner requestStatus={requestStatus}/>
              {speakersData.map((speaker) => {
                    return(<Speaker key={speaker.id} 
                        speaker={speaker} 
                        showSessions={showSessions}
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