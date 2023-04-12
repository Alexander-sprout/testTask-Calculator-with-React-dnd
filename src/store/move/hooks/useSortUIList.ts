import { DataFromSort } from "../../../types"
import { useAppDispatch, useAppSelector } from "../../store"
import { setUIList } from "../moveReducer"


export const useSortUIList = () => {

    const uiList = useAppSelector(({ move }) => move.uiList)
    const dispatch = useAppDispatch()


    const sortUIList = (payload: DataFromSort) => {
        if (!uiList.length || !uiList.some(item => item.type === payload.drop.type)) {
            return
        }
        if (!uiList.some(item => item.type == payload.drag.type && uiList.length < 4)) {
            if (uiList.filter((el) => el.type !== 'result').length === 1) {

                dispatch(setUIList([payload.drag, ...uiList]))
                return
            }
            if (uiList.filter((el) => el.type !== 'result').length === 2) {

                dispatch(setUIList([...uiList.slice(0, payload.drop.id), payload.drag, ...uiList.slice(payload.drop.id)]))
                return
            }
        }
        const deletedElement = uiList[payload.drag.id]

        const listCopy = uiList.filter(
            (el) => el.type !== deletedElement.type
        )
        const newColumns = [
            ...listCopy.slice(
                0, payload.drop.id
            ),
            deletedElement,
            ...listCopy.slice(
                payload.drop.id
            )
        ]

        dispatch(setUIList(newColumns))
    }
    return (
        { sortUIList }
    )
}