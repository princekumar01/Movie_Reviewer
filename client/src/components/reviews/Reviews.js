import React from 'react'
import {useEffect, useRef, useState} from 'react';
import api from '../../api/axiosConfig';
import {useParams} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';
import './Reviews.css'

const Reviews = ({getMovieData,movie,reviews,setReviews}) => {

    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;
    
    const [editText,setEdit]=useState(0)
    useEffect(()=>{
        getMovieData(movieId);
    },[])

    const addReview = async (e) =>{
        e.preventDefault();

        const rev = revText.current;
        console.log(rev.value);
        if(rev.value=='')
        return;
        if(editText!=0){
        editReview();         
        }
        else{
        try
        {
            const userId = JSON.parse(localStorage.getItem('userId'));
            const response= await api.post("/watchlist/reviews/create",{body:rev.value,imdbId:movieId,userId:userId});

            const updatedReviews = [...reviews, response.data];
            rev.value = "";
            
            //console.log(updatedReviews);
            setReviews(updatedReviews);
        }
        catch(err)
        {
            console.error(err);
        }
    }
    }

    const deleteReview=async(r)=>{
        try{
            await api.post("/watchlist/reviews/delete",{_id:r._id,imdbId:movieId});
            setReviews(reviews.filter(review=>review._id!=r._id))
        }
        catch(err){
        console.error(err);
        }
    }
    
    
    const edit =(r) =>{  
        revText.current.value=r.body;
        setEdit(r._id);
    }

    const editReview = async () =>{
        
        const rev = revText.current;
        console.log(rev.value);


        try
        {
            const response= await api.post("/watchlist/reviews/edit",{body:rev.value,imdbId:movieId,_id:editText});
            const movie=response.data;
            setReviews([...movie.reviewIds]);
            setEdit(0);
            rev.value = "";
        }
        catch(err)
        {
            console.error(err);
        }
    }

  return (
    <Container>
        <Row>
            <Col><h3>Reviews</h3></Col>
        </Row>
        <Row className="mt-2">
            <Col>
                <img src={movie?.poster} alt="" />
            </Col>
            <Col>
                {
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} revText={revText} editText={editText} labelText = "Write a Review?" defaultValue=""/>  
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                }
                {
                    reviews?.map((r) => {
                        //console.log(r._id);
                        return(
                            <>
                                <Row>
                                    <Col>{r.body}
                                    {
                                    (JSON.parse(localStorage.getItem('userId')))==r.userId?
                                    <>
                                    <button  className='close' style={{padding:'0.2em'}}  onClick={()=>deleteReview(r)}>Delete</button>  
                                    <button  className="edit" style={{padding:'0.2em'}} onClick={()=>edit(r)}>Edit</button>
                                    </>
                                    :''} 
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>                                
                            </>
                        )
                    })
                }
            </Col>
        </Row> 
        <Row>
            <Col>
                <hr />
            </Col>
        </Row>        
    </Container>
  )
}

export default Reviews