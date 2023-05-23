import {useAppDispatch, useAppSelector} from "../../hook";

export function Counter() {
    // The `state` arg is correctly typed as `RootState` already
    const count = useAppSelector((state: any) => state.counter.value)
    const dispatch = useAppDispatch()

    // omit rendering logic
}