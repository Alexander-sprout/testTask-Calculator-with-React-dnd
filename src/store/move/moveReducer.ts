import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { DataFromSort, DeleteElement, UiItem } from "../../types"


const MoveSlice = createSlice({
    name: 'move',
    initialState: {
        defaultList: [
            {
                id: 0,
                type: 'result',
            },
            {
                id: 1,
                type: 'operations',
            },
            {
                id: 2,
                type: 'numbers',
            },
            {
                id: 3,
                type: 'equal-sign',

            }
        ] as UiItem[],
        uiList: [] as UiItem[],
        focusDropElelement: ''
    },
    reducers: {
        moveToUIList: (state, { payload }: PayloadAction<UiItem>) => {
            if (state.focusDropElelement && payload.type !== 'result'
                || state.uiList.some((item) => item.type === payload.type)
            ) {
                return
            }
            if (payload.shouldBeFirst) {
                state.uiList = ([payload, ...state.uiList].sort((a, b) => a.id - b.id))
                return
            }
            state.uiList = [...state.uiList, payload]
        },
        sortUIList: (state, { payload }: PayloadAction<DataFromSort>) => {
            if (payload.shouldBeFirst) {
                return
            }
            if (!state.uiList.some(item => item.type == payload.drag.type && state.uiList.length < 4)) {
                if (state.uiList.length === 1) {
                    state.uiList = [payload.drag, ...state.uiList]
                    return
                }
                if (state.uiList.length === 2 || state.uiList.length === 3) {
                    state.uiList = [...state.uiList.slice(0, payload.drop.id), payload.drag, ...state.uiList.slice(payload.drop.id)]
                    return
                }
            }
            const deletedElement = state.uiList[payload.drag.id]

            const listCopy = state.uiList.filter(
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

            state.uiList = newColumns
        },
        deleteElement: (state, { payload }: PayloadAction<DeleteElement>) => {
            if (!payload.executeCalc) {
                state.uiList = state.uiList.filter((el) => el.type !== payload.type)
            }
        },
        setFocusDropElelement: (state, { payload }: PayloadAction<string>) => {
            state.focusDropElelement = payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                (action) => action.type !== 'move/setFocusDropElelement',
                (state) => {
                    if (!state.uiList.length || state.uiList.filter(({ id }, index) => id === index).length === state.uiList.length) {
                        return
                    }
                    if (state.uiList.some(item => item.shouldBeFirst)) {
                        const deleteElement = state.uiList.filter((el) => el.shouldBeFirst)[0]
                        state.uiList = [deleteElement, ...state.uiList.filter((el) => !el.shouldBeFirst)]
                    }
                    state.uiList.length && (
                        state.uiList = state.uiList.map(({ type }, index) => {
                            return { type, id: index }
                        }))
                }
            )
    }
}
)


export default MoveSlice.reducer

export const {
    moveToUIList,
    sortUIList,
    deleteElement,
    setFocusDropElelement
} = MoveSlice.actions