import React from 'react'

function Button({onClick, name, style, image}) {
  return (
    <button className={`px-4 py-2 h-10 rounded-md p-1 mr-2 ${style}`}  onClick={onClick}>{image ? (<img className='w-6 h-6' src={image} alt={name}/>) : name}</button>
  )
}

export default Button