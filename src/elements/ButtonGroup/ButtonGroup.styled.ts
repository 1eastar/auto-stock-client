import styled from 'styled-components'

import { loader } from 'Styles/mixins'

const ContentWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  pointer-events: none;
`

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 4px;
`

const Loader = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    ${loader(14, 2, 'grey', 0.6)}
    content: '';
    display: inline-block;
    border-right-color: transparent;
  }
`

export default {
  ContentWrapper,
  Content,
  Loader,
}
