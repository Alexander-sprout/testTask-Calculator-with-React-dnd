import { useEffect } from "react"

import { changeResultIsAddStatus, setCalcExpress, setCalcMiddleResult, setCalcOperations, setCalcResult, setCalcResultAfterEqual } from '../calcReducer'
import { useAppDispatch, useAppSelector } from "../../store"


export const useEnteringOperations = () => {
    const dispatch = useAppDispatch()
    const { result, operation, express, middleResult, isResultAfterEqual } = useAppSelector(({ calc }) => calc)


    const addOperation = (oper: string) => {
        if (oper === 'x') {
            oper = '*'
        }
        if (middleResult && express.length > 1 && isResultAfterEqual) {
            dispatch(setCalcExpress([result, oper]))
            dispatch(setCalcMiddleResult(''))
            dispatch(setCalcResultAfterEqual(false))
            return
        }
        if (operation) {
            return
        }
        dispatch(setCalcOperations(oper))
        dispatch(setCalcExpress([...express, result, oper]))
        dispatch(changeResultIsAddStatus(false))
        dispatch(setCalcMiddleResult(''))
    }
    useEffect(() => {
        if (express.length > 3) {
            const setResult = eval(express[0] + express[1] + express[2]).toString()
            dispatch(setCalcMiddleResult(express[2]))
            dispatch(setCalcResult(setResult))
            dispatch(changeResultIsAddStatus(false))
            dispatch(setCalcExpress([setResult, operation]))
        }
        if (express.length === 3) {
            dispatch(setCalcMiddleResult(express[2]))
            if (middleResult) {
                const setResult = eval(express[0] + express[1] + middleResult).toString()
                dispatch(setCalcResult(setResult))
                dispatch(setCalcExpress([setResult, express[1]]))
                dispatch(changeResultIsAddStatus(false))
                dispatch(setCalcOperations(''))
                dispatch(setCalcResultAfterEqual(true))
            }
        }

    }, [express])
    return (
        { addOperation }
    )
}