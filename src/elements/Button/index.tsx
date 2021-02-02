import React, { forwardRef } from 'react';

import Styled, { BaseButtonAttr } from './Button.styled'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLDivElement>, BaseButtonAttr {}

function Button({
  children,
  onClick,
  buttonType,
  width,
  height,
  ...otherProps
}: ButtonProps, forwardRef: React.Ref<HTMLDivElement>) {
  return (
    <Styled.BaseButton
      ref={forwardRef}
      onClick={onClick}
      buttonType={buttonType}
      width={width}
      height={height}
      {...otherProps}
    >
      { children }
    </Styled.BaseButton>
  );
};

export default forwardRef(Button);
