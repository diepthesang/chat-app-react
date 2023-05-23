import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../state-management/store";
import {decrement, increment} from "../../state-management/features/counter/counter.slice";

export function Counter() {
    const count = useSelector((state: RootState) => state.counter.value)
    const dispatch = useDispatch()

    return (
        <div>
            <div style={{color: 'yellow'}}>counter</div>
            <div>
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    Increment
                </button>
                <span style={{color: 'white'}}>{count}</span>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    Decrement
                </button>
            </div>
        </div>
    )
}