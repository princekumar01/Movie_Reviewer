import React from 'react';
import './Movie.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Button } from "@mui/material"

function Movie({deleteMovie,movie}) {
  console.log('render Video') 

   
  return (
      <>    
                        <div className="movie-card-container1" >
                        <div className='container1'>
                            <div className="movie-poster1">
                                <img src={movie.poster} alt="" />
                            </div>
                             <div className="movie-detail11">  
                                    <div className="movie-title1">
                                    <h4>{movie.title}</h4>
                                    </div>
                                    <div className="movie-buttons-container1">
                                        <Link to={`/Trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>
                                            <div className="play-button-icon-container1">
                                            <FontAwesomeIcon className="play-button-icon1" icon={faCirclePlay} />
                                            </div>
                                        </Link>
                                        </div>
                                        <div className="movie-review-button-container1">
                                        <Button className='close' style={{padding:'0.2em',border: '1px solid gold',borderRadius: '10px',overflow: 'hidden',margin:'0.2em'}}  onClick={()=>deleteMovie(movie.imdbId)}>Delete</Button>    
                                        </div>
                                        </div>

                                </div>
                            </div>   
      </>
  );
}

export default Movie;