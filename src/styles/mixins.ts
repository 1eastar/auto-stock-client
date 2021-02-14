import { css } from 'styled-components'

export const loader = (
  size: number,
  borderWidth: number,
  color: string,
  duration: number
) => css`
  display: inline-block;
  width: ${size}px;
  height: ${size}px;
  border: solid ${borderWidth}px ${color};
  border-top-color: transparent;
  border-radius: 50%;
  animation: rotate ${duration}s infinite linear;
  transform-origin: 50% 50%;

  @keyframes rotate {
    0%    { transform: rotate(0deg); }
    100%  { transform: rotate(360deg); }
  }
`
