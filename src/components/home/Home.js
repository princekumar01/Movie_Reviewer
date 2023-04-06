import React from 'react'
import Hero from '../hero/Hero'

const Home = ({movies_collection}) => {
  return (
    <Hero movies={movies_collection}/>
  )
}

export default Home
