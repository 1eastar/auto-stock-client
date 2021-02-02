import styled from 'styled-components'

import IconSize from 'Constants/IconSize'

function getMargin({
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
}: BaseIconAttr): string {
  return `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`
}

export interface BaseIconAttr {
  url: string
  size: IconSize
  marginTop?: number
  marginRight?: number
  marginBottom?: number
  marginLeft?: number
}

const BaseIcon = styled.div<BaseIconAttr>`
  ${({ size }) => `width: ${size}px; height: ${size}px;`}
  margin: ${getMargin};
  background-image: url(${({ url }) => `${url}`});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
`

export default {
  BaseIcon,
}
