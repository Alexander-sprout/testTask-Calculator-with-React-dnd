import React, { useCallback, useEffect } from "react"
import { useDrag, useDragLayer, useDrop } from "react-dnd"
import { useDispatch } from "react-redux"


import { useAppSelector } from "../../store"
import { selectElement } from "../moveReducer"
import { UiItem } from "../../../types"
import { useSortUIList } from "./useSortUIList"


export const useSortDrop = (id: number = 0, type: string = '') => {
    const dispatch = useDispatch()
    const isCalc = useAppSelector(({ toggle }) => toggle.executeCalc)
    const ref = React.useRef<HTMLDivElement>(null)
    const isSelected = useAppSelector(({ move }) => move.focusDropElelement)
    const uiList = useAppSelector(({ move }) => move.uiList)
    const { sortUIList } = useSortUIList()
    const handleHover = useCallback((item: UiItem) => {
        if (item.type === type || isSelected === type) {
            return
        }

        uiList.some(item => item.type === type) &&
            dispatch(selectElement(type))

    }, [isSelected])
    const [__, drag] = useDrag<{ id: number, type: string }, unknown, { __: boolean }>(() => ({
        type: 'KEYBOARD',
        canDrag: !isCalc && (!uiList.some(item => item.type === 'result') || type !== 'result'),
        item: {
            id,
            type
        },
    }), [id, isCalc])
    const [_, drop] = useDrop<UiItem>({
        accept: 'KEYBOARD',
        hover: handleHover,
        canDrop: () => type !== 'result',
        drop(item) {
            if (!ref.current || type === item.type) {
                return
            }
            sortUIList({
                drag: {
                    id: item.id,
                    type: item.type,
                },
                drop: {
                    id: id,
                    type: type
                }
            })
        },
    }, [id, handleHover])

    const { isDragging, item } = useDragLayer(monitor => ({
        isDragging: monitor.isDragging(),
        item: monitor.getItem(),
    }));
    drag(drop(ref))
    useEffect(() => {
        if (!isDragging && isSelected) {
            dispatch(selectElement(''))
        }
    }, [isDragging])
    return (
        { ref, isDragging, item }
    )
}