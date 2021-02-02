import React, { CSSProperties, ReactNode } from 'react'

import Styled, { BaseTextProps } from './Text.styled'

interface TextProps extends BaseTextProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

export default function Text({
  className,
  bold = false,
  italic = false,
  typo = Typography.Size14,
  style,
  children,
}: TextProps) {
  return (
    <Styled.BaseText
      className={className}
      style={style}
      bold={bold}
      italic={italic}
      typo={typo}
    >
      { children }
    </Styled.BaseText>
  )
}

export const Typography = Styled.Typography
