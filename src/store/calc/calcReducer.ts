import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const calcSlice = createSlice({
    name: 'calc',
    initialState: {
        result: '0' as string,
        resultForRender: '0' as string,
        operation: '' as string,
        express: [] as string[],
        isResultAdd: false as boolean,
        middleResult: '' as string,
        isResultAfterEqual: false as boolean
    },
    reducers: {
        changeResultIsAddStatus: (state, { payload }: PayloadAction<boolean>) => {
            state.isResultAdd = payload
        },
        setCalcResult: (state, { payload }: PayloadAction<string>) => {
            state.result = payload
        },
        setCalcExpress: (state, { payload }: PayloadAction<string[]>) => {
            state.express = payload
        },
        setCalcOperations: (state, { payload }: PayloadAction<string>) => {
            state.operation = payload
        },
        setCalcMiddleResult: (state, { payload }: PayloadAction<string>) => {
            state.middleResult = payload
        },
        setCalcResultAfterEqual: (state, { payload }: PayloadAction<boolean>) => {
            state.isResultAfterEqual = payload
        },
        setResultForRender: (state, { payload }: PayloadAction<string>) => {
            state.resultForRender = payload
        }
    }
})

export default calcSlice.reducer


export const {
    changeResultIsAddStatus,
    setCalcResult,
    setCalcExpress,
    setCalcOperations,
    setCalcMiddleResult,
    setCalcResultAfterEqual,
    setResultForRender,
} = calcSlice.actions





