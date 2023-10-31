import React from 'react'

function Input({type, name, onChange, style}) {
  return (
    <div>
      <span>{name}:</span>
      <input className={`border w-24 m-2 p-1 ${style}`} type={type} name={name} onChange={onChange}/>
    </div>
  )
}

export default Input