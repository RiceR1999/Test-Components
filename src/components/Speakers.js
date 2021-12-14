import SpeakersToolbar from './SpeakersToolbar';
import SpeakersList from './SpeakersList';
import { useState } from "react";
import { SpeakerFilterProvider } from '../../context/SpeakerFilterContext';

const Speakers = () => {


    return (
        <>
            <SpeakerFilterProvider startingShowSessions={false}>
                <SpeakersToolbar/>
                <SpeakersList />
            </SpeakerFilterProvider>
        </>
    );
}

export default Speakers