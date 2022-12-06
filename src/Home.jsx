import React, { useEffect } from 'react';
import axios from 'axios';

function Home() {
  useEffect(() => {
    const URL = 'https://mock-api.driven.com.br/api/v8/cineflex/movies';
    const controller = new AbortController();
    const { signal } = controller;

    const fetchMovies = async () => {
      try {
        const movies = await axios.get(URL, { signal });
        console.log(movies);
      } catch (error) {
        alert(error.message);
        throw new Error(error);
      }
    };
    fetchMovies();

    return () => {
      console.log('clean');
      controller.abort();
    };
  }, []);

  return (
    <div>
      oi
    </div>
  );
}

export default Home;
