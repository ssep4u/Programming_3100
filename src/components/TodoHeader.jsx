import { useState } from 'react'

export default function TodoHeader({ changeBgColor, currentBgColor }) {
    const [pickerColor, setPickerColor] = useState(currentBgColor);

    return (
        <>
            <h1 className='todo__title'>ToDo List</h1>
            <input
                type="color"
                value={pickerColor}
                onChange={(e) => {
                    setPickerColor(e.target.value);
                    changeBgColor(e.target.value);
                }}
            />

        </>
    )
}
