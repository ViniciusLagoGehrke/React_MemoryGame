import React from 'react'
import styled from 'styled-components'

const Spinner = styled.div`
  height: 32px;
  width: 32px;
  -webkit-animation: step-1 4.8s linear infinite;
  animation: step-1 4.8s linear infinite;

  @-webkit-keyframes step-1 {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes step-1 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const SecondSpinner = styled.span`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  height: 32px;
  width: 32px;
  clip: rect(0, 32px, 32px, 16px);
  -webkit-animation: step-2 1.2s linear infinite;
  animation: step-2 1.2s linear infinite;

  @-webkit-keyframes step-2 {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(220deg);
    }
  }
  @keyframes step-2 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(220deg);
    }
  }

  ::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    height: 32px;
    width: 32px;
    clip: rect(0, 32px, 32px, 16px);
    border: 3px solid #fff;
    border-radius: 50%;
    -webkit-animation: step-3 1.2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
    animation: step-3 1.2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
  }
  @-webkit-keyframes step-3 {
    0% {
      -webkit-transform: rotate(-140deg);
    }
    50% {
      -webkit-transform: rotate(-160deg);
    }
    100% {
      -webkit-transform: rotate(140deg);
    }
  }
  @keyframes step-3 {
    0% {
      transform: rotate(-140deg);
    }
    50% {
      transform: rotate(-160deg);
    }
    100% {
      transform: rotate(140deg);
    }
  }
`

const CircularProgress: React.FC = () => {
  return (
    <Spinner data-testid='spinner'>
      <SecondSpinner role="alert" />
    </Spinner>
  )
}

export default CircularProgress;