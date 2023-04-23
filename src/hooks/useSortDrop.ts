import React, { useCallback, useEffect } from "react"
import { useDrag, useDragLayer, useDrop } from "react-dnd"


import { useAppDispatch, useAppSelector } from "../store/store"
import { setFocusDropElelement, sortUIList } from "../store/move/moveReducer"
import { UiItem } from "../types"


export const useSortDrop = (id: number = 0, type: string = '', shouldBeFirst?: boolean) => {
    const { toggle: { executeCalc }, move: { uiList, focusDropElelement } } = useAppSelector(({ root }) => root)
    const ref = React.useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch()
    const handleHover = useCallback((item: UiItem) => {
        if (item.type === type || focusDropElelement === type) {
            return
        }
        uiList.some(item => item.type === type) &&
            dispatch(setFocusDropElelement(type))

    }, [focusDropElelement])
    const [__, drag] = useDrag<{ id: number, type: string }, unknown, { __: boolean }>(() => ({
        type: 'KEYBOARD',
        canDrag: !executeCalc && (!uiList.some(item => item.type === 'result') || type !== 'result'),
        item: {
            id,
            type,
            shouldBeFirst
        },
    }), [id, executeCalc])
    const [_, drop] = useDrop<UiItem>({
        accept: 'KEYBOARD',
        hover: handleHover,
        canDrop: () => type !== 'result',
        drop(item) {
            if (!ref.current || type === item.type) {
                return
            }
            dispatch(sortUIList({
                shouldBeFirst: item.shouldBeFirst,
                drag: {
                    id: item.id,
                    type: item.type,
                },
                drop: {
                    id: id,
                    type: type
                }
            }))
        },
    }, [id, handleHover])
    const { isDragging, item } = useDragLayer(monitor => ({
        isDragging: monitor.isDragging(),
        item: monitor.getItem(),
    }));
    drag(drop(ref))
    useEffect(() => {
        if (!isDragging && focusDropElelement) {
            dispatch(setFocusDropElelement(''))
        }
    }, [isDragging])
    return (
        { ref, item }
    )
}