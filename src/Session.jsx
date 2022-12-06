/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

function Session() {
  const { idSessao } = useParams();
  const [session, setSession] = useState(null);
  const [seats, setSeats] = useState([]);

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

  console.log(session, seats);

  return (
    <StyledSession>
      <p>Selecione o(s) assentos</p>
      <StyledSeats>
        {session?.data.seats.map(({ id, name, isAvailable }) => (
          <StyledSeat
            key={id}
            color={seats.includes(name)}
            disabled={!isAvailable}
            onClick={() => setSeats((prevState) => [...prevState, name])}
          >
            {name.length > 1 ? name : `0${name}`}
          </StyledSeat>
        ))}
      </StyledSeats>
      <StyledSubs>
        <div>
          <span name="selected" />
          <p>Selecionado</p>
        </div>
        <div>
          <span name="avaliable" />
          <p>Disponível</p>
        </div>
        <div>
          <span name="unavaliable" />
          <p>Indisponível</p>
        </div>
      </StyledSubs>
    </StyledSession>
  );
}

const StyledSubs = styled.div`
  background-color: red;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 30px;

  & div {
    background-color: purple;
    width: 33%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    p {
      font-size: 18px;
      position: absolute;
      top: 20px;
    }

    & span {
      border-radius: 50%;
      min-width: 42px;
      min-height: 42px;
      position: absolute;
      top: 0;
      background-color: blue;

      &[name=selected] {
        background-color: #1aae9e;
        border: 1px solid #0e7d71;
      }
      &[name=avaliable] {
        background-color: #c3cfd9;
        border: 1px solid #7b8b99;
      }

      &[name=unavaliable] {
        background-color: #fbe192;
        border: 1px solid #f7c52b;
      }
    }
  }
`;

const StyledSeats = styled.div`
  /* background-color: red; */

    
`;

const StyledSeat = styled.button`
  background-color: ${({ color, disabled }) => {
    if (disabled) return '#fbe192';
    if (color) return '#1aae9e';
    return '#c3cfd9';
  }};
  text-align: center;
  margin: 5px;
  padding: 10px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.6);
`;

const StyledSession = styled.div`
  /* background-color: red; */
  padding: 10px;
  text-align: center;
  
  p {
    font-size: 24px;
    /* background-color: green; */
    margin: 30px 0 30px 0;
  }
`;

export default Session;
