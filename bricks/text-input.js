import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import { View, TextInput as TextInputRN } from 'react-native'


const PressState = Object.freeze({
  PRESSED: 1,
  NOT_PRESSED: 2,
  TO_BE_BLURRED: 3,
})

const TextInput = forwardRef((props, ref) => {
  const pressState = useRef(PressState.NOT_PRESSED)
  const inputRef = useRef(null)

  const showPlaceholder = props.onPlaceholder === undefined || props.children === undefined
  const placeholder = showPlaceholder ? props.placeholder : undefined

  const onFinalLayout = () => {
    if (props.onPlaceholder) {
      props.onPlaceholder(showPlaceholder)
    }
  }

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    isFocused: () => inputRef.current.isFocused(),
  }));

  const onPressIn = () => {
    pressState.current = PressState.PRESSED
    setTimeout(() => {
      if (pressState.current === PressState.PRESSED) {
        if (props.onLongPress) {
          if (props.onLongPress()) {
            pressState.current = PressState.TO_BE_BLURRED
          }
        }
      }
    }, 500)
    // todo: use delayLongPress from Pressable 
    // (consistent with rest of the app)
  }

  const onPressOut = () => {
    if (pressState.current === PressState.TO_BE_BLURRED) {
      setTimeout(() => inputRef.current.blur(), 0)
      // todo: not sure if we can count on delay 0 being executed after
      // text input gets focus
    }
    pressState.current = PressState.NOT_PRESSED
  }

  return (
    <View onLayout={onFinalLayout} style={props.style}>
      <TextInputRN
        ref={inputRef}
        {...props}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        placeholder={placeholder}
      />
    </View>
  )
})

export default TextInput