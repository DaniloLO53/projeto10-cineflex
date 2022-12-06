/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Session() {
  const { idSessao } = useParams();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const URL = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`;
    const controller = new AbortController();
    const { signal } = controller;

    const fetchSession = async () => {
      try {
        const sessionInfo = await axios(URL, { signal });
        setSession(sessionInfo);
      } catch (error) {
        console.log(error.message);
        throw new Error(error);
      }
    };
    fetchSession();

    return () => {
      console.log('Clean');
      controller.abort();
    };
  }, []);

  console.log(session);

  return (
    <div>
      oi
    </div>
  );
}

export default Session;
