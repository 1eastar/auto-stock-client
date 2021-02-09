import React, { forwardRef, memo, useMemo } from 'react'
import _ from 'lodash'

import Button from '@components/atoms/Button'
import Icon from '@components/atoms/Icon'
import ButtonType from '@constants/ButtonType'
import IconSize from '@constants/IconSize'
import Styled from './ButtonGroup.styled'

interface ButtonGroupProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  width: number
  height: number
  disabled?: boolean
  loading?: boolean
  leftIconName?: string
  rightIconName?: string
  buttonType?: ButtonType
  iconSize?: IconSize
  children?: React.ReactNode
}

function ButtonGroup({
  width,
  height,
  disabled = false,
  loading = false,
  leftIconName,
  rightIconName,
  buttonType = ButtonType.JJADA,
  iconSize = IconSize.Normal,
  children,
  onClick,
  ...otherProps
}: ButtonGroupProps, forwardRef: React.Ref<HTMLDivElement>){
  const hasLeftIcon = !_.isEmpty(leftIconName)
  const hasRightIcon = !_.isEmpty(rightIconName)

  const [leftIconElem, rightIconElem] = useMemo(() => {
    const result: [React.ReactElement | null, React.ReactElement | null] = [null, null]
    if (hasLeftIcon) {
      result[0] = (
        <Icon
          name={leftIconName!}
          size={iconSize}
        />
      )
    }
    if (hasRightIcon) {
      result[1] = (
        <Icon
          name={rightIconName!}
          size={iconSize}
        />
      )
    }
    return result
  }, [hasLeftIcon, hasRightIcon, leftIconName, rightIconName, iconSize])

  return (
    <Button
      ref={forwardRef}
      width={width}
      height={height}
      disabled={disabled || loading}
      onClick={onClick}
      buttonType={buttonType}
      {...otherProps}
    >
      <Styled.ContentWrapper>
        {
          !loading && (
            <>
              { leftIconElem }
              <Styled.Content>
                { children }
              </Styled.Content>
              { rightIconElem }
            </>
          )
        }
        {loading && <Styled.Loader/>}
      </Styled.ContentWrapper>
    </Button>
  )
}

export default memo(forwardRef(ButtonGroup))
