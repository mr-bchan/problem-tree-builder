import styled from 'styled-components';
import { Input } from 'semantic-ui-react';

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const Wrapper = styled.div`
  position: relative;
  border: 1px solid red;
  z-index: 99;
  border-radius: ${props => {
    let borderRadius;

    if (props.size === 'huge') {
      borderRadius = '10px !important';
    } else {
      borderRadius = '5px !important';
    }

    return borderRadius;
  }};

  background: white;
  min-height: ${props => (props.size === 'huge' ? '60px' : '45px')};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${props => props.width};
  border-color: ${props =>
    props.bordered || props.active
      ? '#3D3D3C !important'
      : 'transparent !important'};
  font-size: ${props =>
    props.size === 'huge' ? '18px !important' : '14px !important'};

  ${props =>
    props.hasSuggestions &&
    `
    border-bottom-right-radius: 0px !important;
    border-bottom-left-radius: 0px !important;
  `}

  svg {
    font-size: ${props => (props.size === 'huge' ? '24px' : '18px')};
  }

  input {
    border: none !important;
    font-family: 'Lato', sans-serif !important;
    padding-left: 0px !important;
    height: ${props => (props.size === 'huge' ? '58px' : '43px')}

    &::placeholder {
      color: #a0a0a0 !important;
      font-weight: 100 !important;
      text-transform: none !important;
    }

    &:focus {
      ${props => props.active && `border-color: #3D3D3C !important;`}
    }
  }

  button {
    background: white !important;
    text-transform: uppercase !important;
    border-left: 1px solid #3d3d3c !important;
    font-weight: 700 !important;
    color: #3d3d3c !important;
    font-family: 'Lato', sans-serif !important;
    -webkit-font-smoothing: subpixel-antialiased !important;
    letter-spacing: 0.03em !important;
    border-top-right-radius: 9px !important;
    border-bottom-right-radius: 9px !important;
    font-size: ${props =>
      props.size === 'huge' ? '14px !important' : '10px !important'};
    height: ${props =>
      props.size === 'huge' ? '58px !important' : '43px !important'};
    ${props =>
      props.hasSuggestions &&
      `
      border-bottom: 1px solid #3d3d3c !important;
      border-bottom-right-radius: 0px !important;
      z-index: 2 !important;
  `}
  }
`;

export const StyledInput = styled(Input)`
  width: 100%;
  height: 100%;
`;

export const List = styled.div`
  border: 1px solid #3d3d3c;
  border-top: none;
  width: calc(100% - -2px);
  position: absolute;
  margin-top: 57px;
  background: white;
  border-bottom-right-radius: 10px !important;
  border-bottom-left-radius: 10px !important;
  max-height: 250px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding-bottom: 15px;
`;
export const ListItem = styled.div`
  font-size: 16px;
  font-family: 'Lato', sans-serif;
  color: #a0a0a0;
  padding: 10px 43px;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }

  em {
    font-weight: 700;
    -webkit-font-smoothing: subpixel-antialiased;
    font-style: inherit;
  }
`;
