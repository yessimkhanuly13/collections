import React from 'react'
import { Controller } from 'react-hook-form'
import { Input } from '@nextui-org/react'

function InputController({name, label, placeholder, type, endContent, errors, control, style, defaultValue}) {

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
              defaultValue={defaultValue}
              />}
    />
  )
}

export default InputController