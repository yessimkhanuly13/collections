import React from 'react'

function Input({type, name, onChange, style, placeholder, checked}) {
  return (
    <div>
      <input className={`px-4 py-2 h-10 rounded-md p-1 ${style}`} type={type} placeholder={placeholder} name={name} onChange={onChange} checked={checked}/>
    </div>
  )
}

export default Input