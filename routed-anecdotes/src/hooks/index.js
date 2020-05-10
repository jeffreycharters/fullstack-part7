import { useState } from 'react'

export const useField = (name) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        if (event.target.value.length > 0) {
            setValue(event.target.value)
        }
        else {
            setValue('')
        }
    }

    return {
        name,
        value,
        onChange
    }
}