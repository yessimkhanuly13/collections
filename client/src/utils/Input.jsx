import React from 'react'

function Input({type, name, onChange, style}) {
  return (
    <input className={`border w-24 m-2 p-1 ${style}`} type={type} name={name} onChange={onChange}/>
  )
}

export default Input