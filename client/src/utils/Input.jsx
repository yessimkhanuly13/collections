import React from 'react'

function Input({type, name, onChange, style, placeholder}) {
  return (
    <div>
      <input className={`mt-2 px-4 py-2 h-10 rounded-md p-1 ${style}`} type={type} placeholder={placeholder} name={name} onChange={onChange}/>
    </div>
  )
}

export default Input