/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Success({ finalInfos, setFinalInfos }) {
  const {
    movie, date, time, seats, client, cpf,
  } = finalInfos;

  return (
    <StyledSuccess>
      <h1>Pedido feito com sucesso!</h1>
      <div>
        <h3>Filme e sessão</h3>
        <p>{movie}</p>
        <p>
          {date}
          {' '}
          {time}
          {' '}
        </p>
      </div>

      <div>
        <h3>Ingressos</h3>
        {seats.map((info) => (
          <p key={info[0]}>
            Assento
            {' '}
            {info[1]}
            {' '}
          </p>
        ))}
      </div>

      <div>
        <h3>Comprador</h3>
        <p>
          Nome:
          {' '}
          {client}
          {' '}
        </p>
        <p>
          CPF:
          {' '}
          {cpf}
          {' '}
        </p>
      </div>

    </StyledSuccess>
  );
}

const StyledSuccess = styled.div`
  display: flex;
  flex-direction: column;

  & h1 {
    /* background-color: red; */
    text-align: center;
    padding: 10px 150px 10px 150px;
    color: green;
  }

  & div {
    /* background-color: green; */
    padding: 15px;
    font-size: 20px;
  }
`;

Success.propTypes = {
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

export default Success;
