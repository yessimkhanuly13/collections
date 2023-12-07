import React from 'react'
import { Controller } from 'react-hook-form'
import { Checkbox } from '@nextui-org/react'

function CheckboxController({name, style, control, bool, value}) {

    return (
        <Controller name={name} control={control} 
                render={({field})=><Checkbox 
                {...field} 
                isRequired 
                className={style}
                isSelected={bool}
                >
                    {value}
                </Checkbox>
            }
        />
    )
}

export default CheckboxController