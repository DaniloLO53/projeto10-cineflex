/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Form from './Form';

function Session({ finalInfos, setFinalInfos }) {
  const { idSessao } = useParams();
  const [seats, setSeats] = useState([]);

  const handleClick = () => {
    const URL = 'https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many';
    const { seats: ids, client: name, cpf } = finalInfos;
    const payload = {
      ids,
      name,
      cpf,
    };

    try {
      axios.post(URL, payload);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    const URL = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`;
    const controller = new AbortController();
    const { signal } = controller;

    const fetchSession = async () => {
      try {
        const sessionInfo = await axios(URL, { signal });
        setSeats(sessionInfo.data.seats);
        setFinalInfos(() => {
          const { data } = sessionInfo;
          const { day, movie, name } = data;

          return ({
            movie: movie.title,
            date: day.date,
            time: name,
            seats: [],
            client: '',
            cpf: '',
          });
        });
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

  console.log(finalInfos, seats);

  return (
    <StyledSession>
      <p>Selecione o(s) assentos</p>
      <StyledSeats>
        {seats.map(({ id, name, isAvailable }) => (
          <StyledSeat
            key={id}
            color={String(finalInfos.seats.some((infos) => infos[0] === id))}
            disabled={!isAvailable}
            onClick={() => setFinalInfos((prevState) => (
              {
                ...prevState,
                seats: [...prevState.seats, [id, name]],
              }
            ))}
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
      <Form
        setFinalInfos={setFinalInfos}
        finalInfos={finalInfos}
      />
      <button
        type="button"
        onClick={handleClick}
      >
        <Link to="/sucesso">
          Reservar assento(s)
        </Link>
      </button>
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
    if (color === 'true') return '#1aae9e';
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
  
  & > p, & div > p {
    font-size: 24px;
    /* background-color: yellow; */
    margin: 30px 0 30px 0;
  }

  & div > p {
    font-size: 18px;
  }
`;

Session.propTypes = {
  finalInfos: PropTypes.shape(
    PropTypes.string.isRequired,
    PropTypes.string.isRequired,
    PropTypes.string.isRequired,
    PropTypes.array.isRequired,
    PropTypes.string.isRequired,
    PropTypes.string.isRequired,
  ).isRequired,
  setFinalInfos: PropTypes.func.isRequired,
};

export default Session;
