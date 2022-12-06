/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

function Sessions() {
  const idInfo = useParams();
  const [sessions, setSessions] = useState(null);

  useEffect(() => {
    const URL = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${idInfo.idFilme}/showtimes`;
    const controller = new AbortController();
    const { signal } = controller;

    const fetchSessions = async () => {
      try {
        const sessionsInfo = await axios.get(URL, signal);
        setSessions(sessionsInfo.data);
        console.log(sessions);
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
    <StyledSessions>
      {(sessions?.days || []).map(({
        id,
        weekday,
        date,
        showtimes,
      }) => (
        <StyledSession key={id}>
          <StyledDate>
            {weekday}
            {' '}
            -
            {' '}
            {date}
          </StyledDate>
          <StyledTime>
            {showtimes.map(({ name, id: idTime }) => (
              <button type="button" key={idTime}>{name}</button>
            ))}
          </StyledTime>
        </StyledSession>
      ))}
    </StyledSessions>
  );
}

const StyledSessions = styled.div`
  background-color: red;
  width: 100%;
`;

const StyledSession = styled.div`
  background-color: green;
  width: 100%;
`;

const StyledDate = styled.div`
  background-color: purple;
  width: 100%;
`;

const StyledTime = styled.div`
  background-color: yellow;
  width: 100%;
`;

export default Sessions;
