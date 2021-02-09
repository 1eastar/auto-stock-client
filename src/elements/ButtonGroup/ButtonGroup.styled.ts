import styled from 'styled-components'

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
    content: '';
    display: inline-block;
    width: 14px;
    height: 14px;
    border: solid 2px grey;
    border-top-color: transparent;
    border-right-color: transparent;
    border-radius: 50%;
    animation: rotate .6s infinite linear;
    transform-origin: 50% 50%;

    @keyframes rotate {
      0%    { transform: rotate(0deg); }
      100%  { transform: rotate(360deg); }
    }
  }
`

export default {
  ContentWrapper,
  Content,
  Loader,
}
