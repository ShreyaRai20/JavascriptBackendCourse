import React, { useState } from 'react'

function Counter() {

    const [counter, setCounter] = useState({ count: 0 })
    return (
        <div>
            {counter.count}
            <button onClick={(e) => {
                e.preventDefault()
                setCounter(counter.count + 1)
            }}></button>
        </div >
    )
}

export default Counter
