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
      <p>
        Selecione o horário
      </p>
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
              <StyledTimeButton type="button" key={idTime}>{name}</StyledTimeButton>
            ))}
          </StyledTime>
        </StyledSession>
      ))}
    </StyledSessions>
  );
}

const StyledTimeButton = styled.button`
  background-color: #e8833a;
  border: none;
  border-radius: 3px;
  margin: 5px;
  color: white;
  padding: 15px;
`;

const StyledSessions = styled.div`
  p {
    padding: 15px;
    text-align: center;
  }
  width: 100%;
`;

const StyledSession = styled.div`
  /* background-color: green; */
  width: 100%;
`;

const StyledDate = styled.div`
  /* background-color: purple; */
  width: 100%;
  padding: 15px;
`;

const StyledTime = styled.div`
  /* background-color: yellow; */
  width: 100%;
  padding: 10px;
  display: flex;
`;

export default Sessions;
