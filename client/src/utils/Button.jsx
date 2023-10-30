import React from 'react'

function Button({onClick, name, style}) {
  return (
    <button className={`border p-1 text-white mr-2 ${style}`}  onClick={onClick}>{name}</button>
  )
}

export default Button