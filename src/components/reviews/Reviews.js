import { useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import api from '../../api/axiosConfig';
import ReviewForm from "../reviewForm/ReviewForm";
import ReviewList from "../reviewForm/ReviewList";

import React from 'react'

const Reviews = ({ getMovieData, movie, reviewIds, setReviewIds }) => {

    const revText = useRef(null);
    const params = useParams();
    const movieId = params.movieId;

    useEffect(() => {
        getMovieData(movieId);
    }, [])

    const addReview = async (e) => {
        e.preventDefault();

        const rev = revText.current;

        try {

            const response = await api.post("/api/v1/reviews", {
                body: rev.value,
                imdbId: movieId
            });

            // console.log(response.data);
            const updatedReviewIds = [...reviewIds, response.data];
    
            rev.value = "";
    
            // console.log(await response.data);
            setReviewIds(updatedReviewIds);

        } catch (error) {

            console.error(error);
            
        }
    }

    return (
        <Container className="mt-4">
            <Row>
                <Col><h3>Reviews</h3></Col>
            </Row>
            <Row className="mt-2">
                <Col><img src={movie?.poster} alt="" style={{height: "70vh"}}/></Col>
                <Col>
                    {
                        <>
                            <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review" />
                            <hr />
                            <ReviewList reviewIds={reviewIds} />
                        </>
                    }
                </Col>
            </Row>
            <hr />
        </Container>
    )
}

export default Reviews
