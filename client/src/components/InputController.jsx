import React from 'react'
import { Controller } from 'react-hook-form'
import { Input } from '@nextui-org/react'

function InputController(props) {
    const {name, label, placeholder, type, endContent, errors, control, style} = props;

  return (
    <Controller name={name} control={control} 
              render={({field})=><Input 

              {...field} 
              isRequired
              errorMessage={errors}
              type={type} 
              label={label}  
              placeholder={placeholder}
              endContent={endContent}
              className={style}
              />}
    />
  )
}

export default InputController