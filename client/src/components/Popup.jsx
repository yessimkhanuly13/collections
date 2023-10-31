import React from 'react'
import Button from '../utils/Button'

function Popup({handleCloseError, message}) {


  return (
    <div className="fixed inset-0 flex items-start justify-center z-50">
       <div className="bg-white text-red m-2 p-10 rounded-lg shadow-md">
          <p>{message}</p>
          <Button name="Close" style="bg-red-600" onClick={handleCloseError}/>
      </div>
    </div>
  )
}

export default Popup