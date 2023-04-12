import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UiItem } from "../../types";

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
        focusDropElelement: '' as string,
    },
    reducers: {
        setUIList: (state, { payload }: PayloadAction<UiItem[]>) => {
            state.uiList = payload.map(({ type }, index) => { return { type, id: index } })
        },
        selectElement: (state, { payload }) => {
            state.focusDropElelement = payload
        },
    }
}
)


export default MoveSlice.reducer

export const {
    setUIList,
    selectElement,
} = MoveSlice.actions