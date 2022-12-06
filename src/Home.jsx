import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Home() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const URL = 'https://mock-api.driven.com.br/api/v8/cineflex/movies';
    const controller = new AbortController();
    const { signal } = controller;

    const fetchMovies = async () => {
      try {
        const { data } = await axios.get(URL, { signal });
        console.log(data);
        setMovies(data);
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
    <StyledMovies>
      {(movies || []).map(({ posterURL, title, id }) => (
        <StyledButton
          key={id}
          type="button"
        >
          <Link to="/sessoes/:idFilme">
            <figure>
              <img alt={title} src={posterURL} />
            </figure>
          </Link>
        </StyledButton>
      ))}
    </StyledMovies>
  );
}

const StyledMovies = styled.div`
  /* background-color: red; */
  max-width: 100vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledButton = styled.div`
  width: 159px;
  height: 200px;
  margin: 20px;
  padding: 8px;
  border-radius: 3px;
  box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.1);

  figure {
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;

export default Home;
