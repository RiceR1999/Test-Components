import React, { useContext, useState } from 'react';
import { SpeakerFilterContext } from '../../context/SpeakerFilterContext';

const SpeakerInfo = ({ first, last, bio, company, twitterHandle, favorite, onFavoriteToggle }) => {
    return(
    <div className='speaker-info'>
    <div className='d-flex justify-content-between mb-3'>
          <h3 className='text-truncate w-200'> 
              {first} {last}
          </h3>
    </div>
    <SpeakerFavorite favorite={favorite} onFavoriteToggle={onFavoriteToggle} />
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

const SpeakerFavorite = ({ favorite, onFavoriteToggle }) => {
    const [inTransition, setInTransition] = useState(false);
    
    function doneCallback() {
        setInTransition(false);
        console.log(`in SpeakerFavorite:doneCallback  ${new Date().getMilliseconds()}`);
    }
    return (
        <div className="action padB1">
            <span onClick={function () {
                setInTransition(true);
                return onFavoriteToggle(doneCallback);
            }}>
                <i className={favorite === true ? "fa fa-star orange" : "fa fa-star-o orange"}>{" "}
                    Favorite{" "}
                    { inTransition ? (<span className="fas fa-circle-notch fa-spin"> </span>) : <></>}
                </i>
            </span>
        </div>
    );
}

const SpeakerImage = ({id, first, last}) => {
  return (
    <div className='speaker-img d-flex flex-row justify-content-center align-items-center h-300'>
    <img className='contain-fit' src={`/images/speaker-${id}.jpg`}
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
// showSessions === true ? <div className='sessionBox card h-250'>
    // <Session {...sessions[0]}/>
    // </div>  : <> </>
const Sessions = ({ sessions, showSessions }) => {
    const { eventYear } = useContext(SpeakerFilterContext);
    return (
        <div className="sessionBox card h-250">
            {sessions.filter((session) => {
                return session.eventYear === eventYear;
            })
                .map((session) => {
                    return (
                        <div className="session w-100" key={session.id}>
                            <Session {...session} />
                        </div>
                )
            })
            }
        </div>
    );
}

const Speaker = ({speaker, onFavoriteToggle}) => {
    const { id, first, last, sessions } = speaker;
    const { showSessions } = useContext(SpeakerFilterContext);
    return (
        <div 
                    key={id}
                    className='col-xs-12 col-sm-12 col-md-6 col-lg-4 col-sm-12 col-xs-12'>
                    <div className="card card-height p-4 mt-4">
                   <SpeakerImage id={id} first={first} last={last}/>
                   <SpeakerInfo {...speaker} onFavoriteToggle={onFavoriteToggle}
                    />
                       </div>
                       <Sessions sessions={sessions} showSessions={showSessions} />        
                  </div>
    );

}

export default Speaker;