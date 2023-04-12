import { useEffect } from "react"

import { changeResultIsAddStatus, setCalcExpress, setCalcMiddleResult, setCalcResult, setCalcResultAfterEqual, setResultForRender } from "../calcReducer"
import { useAppDispatch, useAppSelector } from "../../store"

export const useGetCalcResult = () => {
    const dispatch = useAppDispatch()
    const { result, express, middleResult } = useAppSelector(({ calc }) => calc)

    const MAX_VIEW_SIZE = 17
    const getResult = () => {
        if (express.length === 3) {
            const setResult = eval(express[0] + express[1] + express[2]).toString()
            dispatch(setCalcMiddleResult(express[2]))
            dispatch(setCalcResult(setResult))
            dispatch(setCalcExpress([setResult, express[1]]))
            dispatch(changeResultIsAddStatus(false))
            dispatch(setCalcResultAfterEqual(true))

        }
        if (express.length === 2) {
            if (!middleResult) {
                dispatch(setCalcMiddleResult(result))
                dispatch(setCalcExpress([...express, result]))
                return
            }
            if (middleResult) {
                dispatch(setCalcExpress([...express, middleResult]))
            }
        }
    }
    useEffect(() => {
        if (express.length === 3) {
            dispatch(setCalcMiddleResult(result))
        }
        if (result === 'Infinity') {
            dispatch(setCalcResult('Не определено'))
            dispatch(setCalcExpress([]))
        }
        if (result.includes('.') && result.length > 15) {
            dispatch(setCalcResult(result.substring(-0, 14) + (Number(result[15]) + 1 === 0 ? null : (result[15]) + 1)))

            if (result[result.length - 1] === '0') {
                dispatch(setCalcResult(result.substring(result.length - 1, 1)))

            }
        }
        if (result.includes('.')) {
            for (let i = result.indexOf('.'); i < result.length; i++) {
                if (result[i] === result[i + 1] && result[i + 2] === result[i]) {
                    const setReult = Math.round(Number(result) * (i * 100)) / (i * 100)
                    dispatch(setCalcResult(setReult.toString()))
                    return
                }
            }
        }
        if (result.length < 17) {
            dispatch(setResultForRender(result.toString().replace('.', ',')))
        }
        else {
            // магические 1 (что это)
            dispatch(setResultForRender(result.toString().replace('.', ',').slice(1, MAX_VIEW_SIZE) + '...'))
        }
    }, [result])
    return (
        { getResult }
    )
}