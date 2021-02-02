import styled, { css } from 'styled-components'

export interface BaseTextProps {
  bold?: boolean
  italic?: boolean
  typo?: ReturnType<typeof css>
}

const BaseText = styled.div<BaseTextProps>`
  ${props => props.typo};
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
  font-style: ${props => (props.italic ? 'italic' : 'normal')};
`

const Typography = {
  Size11: css`
    font-size: 11px;
    line-height: 16px;
  `,

  Size12: css`
    font-size: 12px;
    line-height: 16px;
  `,

  Size14: css`
    font-size: 14px;
    line-height: 18px;
  `,

  Size16: css`
    font-size: 16px;
    line-height: 22px;
  `,

  Size18 : css`
    font-size: 18px;
    line-height: 24px;
  `,

  Size24: css`
    font-size: 24px;
    line-height: 32px;
  `,

  Size32: css`
    font-size: 32px;
    line-height: 42px;
  `,

  Size40: css`
    font-size: 40px;
    line-height: 54px;
  `,
}

export default {
  BaseText,
  Typography,
}
