const SpeakerInfo = ({first, last, bio, company, twitterHandle, favorite, onFavoriteToggle}) => {
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

const SpeakerFavorite = ({favorite, onFavoriteToggle}) => {
    return (
        <div className="action padB1">
            <span onClick={onFavoriteToggle}>
                <i className={favorite === true ? "fa fa-star orange" : "fa fa-star-o orange"}>{" "}
                Favorite{" "}
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

const Sessions = ({sessions, showSessions}) => {
    return (
    showSessions === true ? <div className='sessionBox card h-250'>
    <Session {...sessions[0]}/>
    </div>  : <> </>
    
    );
}

const Speaker = ({speaker, showSessions, onFavoriteToggle}) => {
    const{id, first, last, sessions} = speaker;
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