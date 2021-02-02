import React, { memo, useMemo } from 'react';

import IconSize from 'Constants/IconSize'
import Styled, { BaseIconAttr } from './Icon.styled'

export interface IconProps extends React.HTMLAttributes<HTMLDivElement>, Omit<BaseIconAttr, 'url'> {
  name: string
}

function Icon({
  name,
  size = IconSize.Normal,
  marginTop = 0,
  marginRight = 0,
  marginBottom = 0,
  marginLeft = 0,
  ...otherProps
}: IconProps) {
  const src = useMemo(() => `/static/icons/${name}.png`, [name]);
  return (
    <Styled.BaseIcon
      url={src}
      size={size}
      marginTop={marginTop}
      marginRight={marginRight}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      {...otherProps}
    />
  );
};

export default memo(Icon);
