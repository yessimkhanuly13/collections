import React from 'react'

function Input({type, name, onChange}) {
  return (
    <input className='border w-24 m-2 p-1' type={type} name={name} onChange={onChange}/>
  )
}

export default Input