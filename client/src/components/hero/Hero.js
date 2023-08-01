import React from 'react';
import api from '../../api/axiosConfig';
import './Hero.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@mui/material"

const Hero = ({movies}) => {

    const navigate = useNavigate();

    function reviews(movieId) {
        navigate(`/Reviews/${movieId}`);
    }
    
    const add = async(movieId) => {
        try{
            const userId = JSON.parse(localStorage.getItem('userId'));
            const response= await api.post("/watchlist/add",{imdbId:movieId,userId:userId});
           //console.log(response.data);
        }
        catch(err){
            console.error(err);
        }
    }

  return (
    <div className='movie-carousel-container'>
      <Carousel>
        {
            movies?.map((movie) => {
                return (
                    <Paper key={movie.imdbId}>
                        <div className="movie-card-container">
                            <div className="movie-card" style={{"--img": `url(${movie.backdrops[1]})`}}>
                                <div className="movie-detail">
                                    <div className="movie-poster">
                                    <img src={movie.poster} alt="" />
                                    </div>
                                    <div className="movie-title">
                                    <h4>{movie.title}</h4>
                                    </div>
                                    <div className="movie-buttons-container">
                                        <Link to={`/Trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>
                                            <div className="play-button-icon-container">
                                                <FontAwesomeIcon className="play-button-icon" icon={faCirclePlay} />
                                            </div>
                                        </Link>
                                        <div className="movie-review-button-container">
                                            <Button variant="contained" style={{'border': '1px solid gold','border-radius': '10px','overflow': 'hidden',padding:'0.3em' ,margin:'0.1em'}} onClick={() => reviews(movie.imdbId)} >Reviews</Button>
                                            <Button variant="contained" style={{'border': '1px solid gold','border-radius': '10px','overflow': 'hidden',padding:'0.3em',margin:'0.1em'}} onClick={() => add(movie.imdbId)} >+Watchlist</Button>                                  
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Paper>
                )
            })
        }
      </Carousel>
    </div>
  )
}

export default Hero
