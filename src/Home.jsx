import React from 'react'
import HeroSection from './components/HeroSection';
import Services from './components/Services'; 
import Trusted from './components/Trusted';
import Featured from './components/Featured';

const Home = () => {
  

  return (
    <>
      <HeroSection name="EazyMart"
      content="content here..."
      />
      <Featured />
      <Services />
      <Trusted />
    </>
  );
};

export default Home