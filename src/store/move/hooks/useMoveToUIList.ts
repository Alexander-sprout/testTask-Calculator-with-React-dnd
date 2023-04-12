import { UiItem } from "../../../types"
import { useAppDispatch, useAppSelector } from "../../store"
import { setUIList } from "../moveReducer"


export const useMoveToUIList = () => {
    const focus = useAppSelector(({ move }) => move.focusDropElelement)
    const uiList = useAppSelector(({ move }) => move.uiList)
    const dispatch = useAppDispatch()
    const isCalc = useAppSelector(({ toggle }) => toggle.executeCalc)
    const moveToUIList = (payload: UiItem) => {
        if (focus && payload.type !== 'result') {
            return
        }
        if (uiList.some((item) => item.type === payload.type)) {
            return
        }
        if (payload.type === 'result') {
            dispatch(setUIList([payload, ...uiList].sort((a, b) => a.id - b.id)))
            return
        }
        dispatch(setUIList([...uiList, payload]))
    }

    const deleteElement = (type: string) => {
        !isCalc &&
            dispatch(setUIList(uiList.filter((el) => el.type !== type)))
    }
    return (
        { moveToUIList, deleteElement }
    )
}












