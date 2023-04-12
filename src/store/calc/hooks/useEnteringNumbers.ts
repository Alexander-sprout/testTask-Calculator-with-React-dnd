import { useAppDispatch, useAppSelector } from "../../store"
import { changeResultIsAddStatus, setCalcMiddleResult, setCalcOperations, setCalcResult } from "../calcReducer"


export const useEnteringNumbers = () => {
    const dispatch = useAppDispatch()
    const { result, express, isResultAdd } = useAppSelector(({ calc }) => calc)
    const addNumber = (simb) => {
        if (result === '0') {
            if (simb === '.') {
                dispatch(setCalcResult('0.'))
                return
            }
        }
        if (result.includes('.') && simb === '.') {
            return
        }
        if (isResultAdd) {
            dispatch(setCalcResult(result + simb))
            dispatch(setCalcMiddleResult(''))
            return
        }
        if (!isResultAdd || express.length === 3) {
            dispatch(setCalcResult(simb))
            dispatch(setCalcOperations(''))
            dispatch(changeResultIsAddStatus(true))
            dispatch(setCalcMiddleResult(''))
        }
    }
    return (
        { addNumber }
    )
}