import React from 'react';
import Footer from '../component/Footer';

const Home = () => {
  return (
   <>
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-center">
        Welcome to the Quiz Application
      </h1>
    </div>
    <Footer/>
   </>
  );
};

export default Home;
