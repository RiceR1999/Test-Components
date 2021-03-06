import React, { useContext, useState } from 'react';
import { SpeakerFilterContext } from '../../context/SpeakerFilterContext';
import { SpeakerContext, SpeakerProvider } from '../../context/SpeakerContext';
import SpeakerDelete from "./SpeakerDelete";

const SpeakerInfo = () => {
    
    const { speaker } = useContext(SpeakerContext);
    const { first, last, bio, company, twitterHandle, favorite } = speaker;

    return (
    <div className='speaker-info'>
    <div className='d-flex justify-content-between mb-3'>
          <h3 className='text-truncate w-200'> 
              {first} {last}
          </h3>
    </div>
    <SpeakerFavorite />
    <div>
        <p className="card-description">{bio}</p>
        <div className="social d-flex flex-row mt-4">
            <div className="company">
                <h5>Company</h5>
                <h6>{company}</h6>
            </div>
            <div className="twitter">
                <h5>Twitter</h5>
                <h6>{twitterHandle}</h6>
            </div>
        </div>
    </div>
    </div>
    );
}

const SpeakerFavorite = ({ }) => {
    
    const [inTransition, setInTransition] = useState(false);
    const { speaker, updateRecord } = useContext(SpeakerContext);

    function doneCallback() {
        setInTransition(false);
        console.log(`in SpeakerFavorite:doneCallback  ${new Date().getMilliseconds()}`);
    }
    return (
        <div className="action padB1">
            <span onClick={function () {
                setInTransition(true);
                updateRecord(
                    {
                        ...speaker, favorite: !speaker.favorite,
                    },
                    doneCallback
                )
            }}>
                <i className={speaker.favorite === true ? "fa fa-star orange" : "fa fa-star-o orange"}>{" "}
                    Favorite{" "}
                    { inTransition ? (<span className="fas fa-circle-notch fa-spin"> </span>) : <></>}
                </i>
            </span>
        </div>
    );
}

const ImageWithFallBack = ({src, ...props}) => {
    const [error, setError] = useState(false);
    const [imgSrc, setImgSrc] = useState(src);

    function onError() {
        if (!error) {
            setImgSrc("/images/speaker-99999.jpg");
            setError(true);
        }
    }
    return <img src={imgSrc} onError={onError}{...props} />;

    
}

const SpeakerImage = () => {
    
  const { speaker: { id, first, last } } = useContext(SpeakerContext);

  return (
    <div className='speaker-img d-flex flex-row justify-content-center align-items-center h-300'>
    <ImageWithFallBack className='contain-fit' src={`/images/speaker-${id}.jpg`}
    width='300'
    alt={`${first} ${last}`}/>
</div>
  );
}

const Session = ({title, room}) => {
    
    // const {title,room} = session;
    // const {title, room} = props;
    // const title = props.title;
    // const room = props.room;

    

    return (
      <span className='session w-100'>
        {title}<strong>Room: {room.name}</strong>
      </span>
    ); 
}

const Sessions = () => {
    const { showSessions } = useContext(SpeakerFilterContext);
    const { eventYear } = useContext(SpeakerFilterContext);
    const { speaker } = useContext(SpeakerContext);
    const sessions = speaker.sessions;

    return (
        
        showSessions === true ?
        <div className="sessionBox card h-250">
                {sessions.filter((session) => {
                return session.eventYear === eventYear;
            })
            .map((session) => {
                return (
                    <div className="session w-100" key={session.id}>
                        <Session {...session} />
                    </div>
                );
            })}
            
        </div> : <></>
    );
}

const Speaker = ({ speaker, updateRecord, insertRecord, deleteRecord }) => {
    
    const { showSessions } = useContext(SpeakerFilterContext);
    return (
        <SpeakerProvider speaker={speaker} updateRecord={updateRecord} insertRecord={insertRecord} deleteRecord={deleteRecord}>
        <div 
                    key={speaker.id}
                    className='col-xs-12 col-sm-12 col-md-6 col-lg-4 col-sm-12 col-xs-12'>
                    <div className="card card-height p-4 mt-4">
                   <SpeakerImage />
                   <SpeakerInfo />
                       </div>
                <Sessions />
                <SpeakerDelete />
            </div>
        </SpeakerProvider>
    );

}

export default Speaker;