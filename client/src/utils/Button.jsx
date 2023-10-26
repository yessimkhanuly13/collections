import React from 'react'

function Button({onClick, name}) {
  return (
    <button className='border mr-2' onClick={onClick}>{name}</button>
  )
}

export default Button