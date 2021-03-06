import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import styled from 'styled-components';

const Title = styled.h1`
  border: 5px solid black;

`;
const LandingpageContent = styled.h1`
  border: 5px solid black;

`;
function RenderLandingPage(props) {
  return (
   
    <div>
       <Nav />
      <Title>MicroFund</Title>
      <LandingpageContent>
      <p>Helping microentrepreneurs around the world to start their businesses.</p>
      <div>
        <p>
          What is MicroFund?
        </p>
        <p>
          <Link to="/example-list">Example List of Items</Link>
        </p>
      </div>
    </div>
    </LandingpageContent>
  );
}
export default RenderLandingPage;
