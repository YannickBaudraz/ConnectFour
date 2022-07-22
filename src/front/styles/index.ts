import Color from 'color';
import styled from 'styled-components';
import {PlayerColor} from '../../types';

export const Button = styled.button`
  background-image: linear-gradient(to right,
  ${Color(PlayerColor.PINK).lighten(0.4).hex()} 0%,
  ${Color(PlayerColor.GREEN).lighten(0.4).hex()} 100%);
  font-size: 1rem;
  text-align: center;
  background-size: 300% auto;
  color: black;
  border-radius: .5rem;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  transition: .25s ease;
  border: none;
  box-shadow: .5rem .5rem 2rem rgba(0, 0, 0, 0.2);

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-position: right center;
    text-decoration: none;
  }

  &:active:not(:disabled) {
    transform: scale(.95);
  }
`;

export const Input = styled.input`
  padding: .5rem;
  font: inherit;
  line-height: 1;
  border: 1px solid darkgray;
  border-radius: .5rem;

  &:disabled {
    opacity: 0.4;
  }
`;

export const Alert = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: ${Color('palevioletred').lighten(.4).string()};
  color: ${Color('palevioletred').darken(.6).string()};
  border-radius: .25rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export const AlertClose = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: 1s ease;
  color: ${Color('palevioletred').darken(.6).string()};
  font-size: 1.5rem;
  font-weight: bold;

  &:hover {
    color: ${Color('palevioletred').darken(.4).string()};
  }

  &:active {
    transform: scale(.95);
  }
`;

export const Disc = styled.div<{ diameter: number, color?: string }>`
  --diameter: ${props => props.diameter}em;
  --style-size: ${props => props.diameter / 10}em;

  width: var(--diameter);
  height: auto;
  aspect-ratio: 1 / 1;
  border-radius: 100%;
  background-color: ${props => props.color || 'inherit'};
  box-shadow: inset 0 0 0 var(--style-size) ${props => props.color && Color(props.color).darken(0.3).hex() ||
          'inherit'};
  border: solid var(--style-size) ${props => props.color || 'inherit'};
  outline: solid var(--style-size) ${props => props.color && Color(props.color).darken(0.3).hex() || 'inherit'};
`;
