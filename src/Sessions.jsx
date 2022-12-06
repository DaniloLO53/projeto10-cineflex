/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Sessions() {
  const { idFilme } = useParams();
  const [sessions, setSessions] = useState(null);

  useEffect(() => {
    const URL = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`;
    const controller = new AbortController();
    const { signal } = controller;

    const fetchSessions = async () => {
      try {
        const sessionsInfo = await axios.get(URL, signal);
        setSessions(sessionsInfo);
      } catch (error) {
        alert(error.message);
        throw new Error(error);
      }
    };
    fetchSessions();

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

export default Sessions;
