import React from 'react'
import { EyeFilledIcon, EyeSlashFilledIcon } from '../icons/index'


function InputPassEndContent({isVisible, setIsVisible}) {

    return (
        <button className="focus:outline-none" type="button" onClick={()=>setIsVisible(!isVisible)}>
                    {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
        </button>
    )
}

export default InputPassEndContent