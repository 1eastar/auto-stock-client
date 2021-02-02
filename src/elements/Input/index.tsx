import React, { forwardRef, useCallback, useRef, useImperativeHandle } from 'react'

import Styled from './Input.styled'

interface InputHandles {
  focus(): void
  blur(): void
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  width: number
  height: number
}

function Input({
  className,
  width,
  height,
  type,
  placeholder,
  readOnly,
  disabled,
  value,
  onChange,
  ...otherProps
}: InputProps, forwardRef: React.Ref<InputHandles>) {
  const inputRef = useRef<HTMLInputElement>(null)

  const focus = useCallback(() => {
    if (inputRef.current) { inputRef.current.focus() }
  }, [])

  const blur = useCallback(() => {
    if (inputRef.current) { inputRef.current.blur() }
  }, [])

  useImperativeHandle(forwardRef, () => ({
    focus,
    blur,
  }))

  const InputElement = useCallback((elemProps) => {
    if (type === 'textarea') { return (<Styled.InputElement as="textarea" ref={inputRef} {...elemProps} />) }
    return (<Styled.InputElement ref={inputRef} {...elemProps} />)
  }, [type])

  return (
    <InputElement
      className={className}
      width={width}
      height={height}
      type={type}
      placeholder={placeholder}
      readOnly={readOnly}
      disabled={disabled}
      value={value}
      onChange={onChange}
      {...otherProps}
    />
  )
}

export default forwardRef(Input)
