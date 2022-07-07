import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Confetti from 'react-confetti';
import styled from '@emotion/styled';
import './SuccessPage.scss';

const Success = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }, 100);
  });

  const Container = styled.div`
    width: 50%;
    margin: 30px auto 0 auto;
    text-align: center;
    color: #fff;
  `;

  const Title = styled.div`
    font-size: 58px;
  `;

  const Message = styled.div`
    margin-top: 40px;
  `;
  return (
    <div>
      <Container>
        <Confetti width={width} height={height} numberOfPieces={400} />
        <Title>Thank you for your purchase!</Title>
        <Message>You will receive a download link by email</Message>
        <Link to="/">
          <button className="cyber-btn">
            Search games!
            <span>_</span>
            <span className="cyber-glitch">Search more games!</span>
          </button>
        </Link>
      </Container>
    </div>
  );
};

export default Success;
