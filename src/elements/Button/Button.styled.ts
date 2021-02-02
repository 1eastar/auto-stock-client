import styled, { css } from 'styled-components'

import ButtonType from 'Constants/ButtonType'

function getStyleByButtonType(type?: ButtonType | string | null) {
  switch (type) {
    case ButtonType.GREEN:
      return css`
        /* background: ${({ theme }) => theme.colors.jjadagreen};
        color: ${({ theme }) => theme.colors.jjadablue}; */
      `

    case ButtonType.DEFAULT:
      return css`
        background: white;
        border: none;
        border-radius: 5px;
        box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);
      `
    default:
      return null
  }
}

export interface BaseButtonAttr {
  buttonType?: ButtonType
  width: number
  height: number
}

const BaseButton = styled.div<BaseButtonAttr>`
  position: relative;
  ${({ width, height }) => `width: ${width}px; height: ${height}px;`}
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 14px;
  padding-top: 2px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 10px 0px;
  cursor: pointer;
  outline: none;

  ${({ buttonType }) => getStyleByButtonType(buttonType)}
`;

export default {
  BaseButton,
}
