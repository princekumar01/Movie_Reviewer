import React from 'react'

const ReviewList = ({ reviewIds }) => {
    return (
        <div> {
            reviewIds?.map((reviewId, index) => {
                return (
                    <div key={index}>
                        <p>{reviewId.body}</p>
                        <hr />
                    </div>
                )
            })
        }
        </div>
    )
}

export default ReviewList
