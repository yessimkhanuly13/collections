import React from 'react'

function Button({onClick, name, style}) {
  return (
    <button className={`border mt-2 px-4 py-2 rounded-md p-1 text-white mr-2 ${style}`}  onClick={onClick}>{name}</button>
  )
}

export default Button