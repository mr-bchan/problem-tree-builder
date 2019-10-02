import styled from 'styled-components';
import * as colors from '../../constants/colors';

export const Container = styled.div`
  border: solid;
  border-radius: 5px;
  margin: 0 10px;
  display: flex;
  justify-content: space-between;
  -webkit-transition: all 0.1s;
  transition: all 0.1s;
  font-family: 'Lato', sans-serif;

  i {
    font-size: 12px;
  }
`;

export const LegendIdentifier = styled.div`
  width: 8px;
`;

export const Text = styled.div`
  font-size: 12px;
  text-transform: none;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  letter-spacing: 0.008em;
`;

export const Controls = styled.div`
  border-radius: 5px;
  background: #f5f5f5;
  padding: 5px 10px;
  position: absolute;
  margin-left: ${props => props.size || 200}px;
  text-transform: capitalize;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.03em;
  font-family: 'Lato', sans-serif;

  div {
    padding: 5px 0;
    min-width: 160px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    i {
      height: auto;
    }
  }
`;

export const Edit = styled.div`
  color: #3d3d3c;
`;

export const Delete = styled.div`
  color: #3d3d3c;
`;

export const Wrapper = styled.div`
  display: flex;

  ${Container} {
    min-height: ${props => {
      let minHeight;

      if (
        props.identifier === 'problem' ||
        props.identifier === 'cause' ||
        props.identifier === 'effect'
      ) {
        minHeight = '70px';
      } else if (props.identifier === 'empty') {
        minHeight = '45px';
      } else if (props.identifier === 'toBeFilled') {
        minHeight = '55px';
      } else {
        minHeight = '80px';
      }

      return minHeight;
    }};
    border-width: ${props =>
      props.identifier === 'problem' ||
      props.identifier === 'cause' ||
      props.identifier === 'effect'
        ? '2px'
        : '1px'};
    width: ${props => {
      let width;

      if (props.identifier === 'problem') {
        width = '250px';
      } else if (props.identifier === 'empty') {
        width = '180px';
      } else {
        width = '185px';
      }

      return width;
    }};
    font-weight: ${props =>
      props.identifier === 'problem' ||
      props.identifier === 'empty' ||
      props.identifier === 'toBeFilled'
        ? '700'
        : 'normal'};
    background: ${props =>
      props.identifier === 'toBeFilled' ? '#FFE9AF' : '#fff'}
    border-color: ${props => {
      let color;

      if (props.identifier === 'problem') {
        color = colors.problem;
      } else if (props.identifier === 'cause') {
        color = colors.cause;
      } else if (props.identifier === 'effect') {
        color = colors.effect;
      } else if (props.identifier === 'empty') {
        color = '#D7D7D7';
      } else if (props.identifier === 'toBeFilled') {
        color = '#FFE9AF';
      }

      return color;
    }};

    ${props =>
      (props.identifier === 'problem' ||
        props.identifier === 'empty' ||
        props.identifier === 'toBeFilled') &&
      `-webkit-font-smoothing: subpixel-antialiased`}
  }

  ${Text} {
    color: ${props => (props.identifier === 'empty' ? '#DCDCDC' : '#3D3D3C')};
    justify-content: ${props => {
      let justifyContent;

      if (props.identifier === 'empty' || props.identifier === 'toBeFilled') {
        justifyContent = 'space-between';
      } else {
        justifyContent = 'center';
      }

      return justifyContent;
    }};
    text-align: ${props => {
      let textAlign;

      if (props.identifier === 'empty' || props.identifier === 'toBeFilled') {
        textAlign = 'unset';
      } else {
        textAlign = 'center';
      }

      return textAlign;
    }};
  }

  ${LegendIdentifier} {
    background: ${props => {
      let color;

      if (props.identifier === 'problem') {
        color = colors.problem;
      } else if (props.identifier === 'cause') {
        color = colors.cause;
      } else if (props.identifier === 'effect') {
        color = colors.effect;
      }

      return color;
    }};
  }

  ${Controls} {
    color: ${props => {
      let color;

      if (props.identifier === 'problem') {
        color = colors.problem;
      } else if (props.identifier === 'cause') {
        color = colors.cause;
      } else if (props.identifier === 'effect') {
        color = colors.effect;
      }

      return color;
    }};
  }
`;
