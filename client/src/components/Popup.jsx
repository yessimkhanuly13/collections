import React from 'react'
import { Button } from '@nextui-org/react'

function Popup({handleCloseError, message, darkMode}) {


  return (
    <div className="fixed inset-0 flex items-start justify-center z-50">
       <div className="bg-inherit text-red m-2 p-10 rounded-lg shadow-md">
          <p>{message}</p>
          <Button variant='shadow' color='danger' onClick={handleCloseError}/>
      </div>
    </div>
  )
}

export default Popup