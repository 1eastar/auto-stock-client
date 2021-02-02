import styled from 'styled-components'

interface InputElementAttr {
  width: number
  height: number
}

const InputElement = styled.input<InputElementAttr>`
  ${({ width, height }) => `width: ${width}px; height: ${height}px;`}
  padding-top: 2px;
  margin-top: 14px;
  text-align: center;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);
  cursor: text;
  transition: box-shadow 0.15s ease-in-out;

  &:focus {
    outline: none;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.6);
  }

  &:disabled {
    color: grey;
    background-color: rgba(80, 80, 80, 0.2);
  }
`

export default {
  InputElement,
}
