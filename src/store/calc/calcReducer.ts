import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const MAX_VIEW_SIZE = 16

const calcSlice = createSlice({
    name: 'calc',
    initialState: {
        result: '0',
        resultForRender: '0',
        operation: '',
        express: [] as string[],
        isResultAdd: false,
        middleResult: '',
        isResultAfterEqual: false,
    },
    reducers: {
        addNumber: (state, { payload }: PayloadAction<string>) => {
            if (state.result === '0') {
                if (payload === '.') {
                    state.result = '0.'
                    return
                }
            }
            if (state.result.includes('.') && payload === '.') {
                return
            }
            if (state.isResultAdd) {
                state.result = state.result + payload
                state.middleResult = ''
                return
            }
            if (!state.isResultAdd || state.express.length === 3) {
                state.result = payload
                state.operation = ''
                state.isResultAdd = true
                state.middleResult = ''
            }
        },
        addOperation: (state, { payload }: PayloadAction<string>) => {
            if (payload === 'x') {
                payload = '*'
            }
            if (state.middleResult && state.express.length > 1 && state.isResultAfterEqual) {
                state.express = [state.result, payload]
                state.middleResult = ''
                state.isResultAfterEqual = false
                return
            }
            if (state.operation) {
                return
            }
            state.operation = payload
            state.express = [...state.express, state.result, payload]
            state.isResultAdd = false
            state.middleResult = ''
        },
        getResult: (state) => {
            if (state.express.length === 3) {
                const setResult = eval(state.express[0] + state.express[1] + state.express[2]).toString()
                state.middleResult = state.express[2]
                state.result = setResult
                state.express = [setResult, state.express[1]]
                state.isResultAdd = false
                state.isResultAfterEqual = true
            }
            if (state.express.length === 2) {
                if (!state.middleResult) {
                    state.middleResult = state.result
                    state.express = [...state.express, state.result]
                    return
                }
                if (state.middleResult) {
                    state.express = [...state.express, state.middleResult]
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                (action) => action,
                (state) => {
                    if (state.express.length > 3) {
                        const setResult = eval(state.express[0] + state.express[1] + state.express[2]).toString()
                        state.middleResult = state.express[2]
                        state.result = setResult
                        state.isResultAdd = false
                        state.express = [setResult, state.operation]
                    }
                    if (state.express.length === 3) {
                        state.middleResult = state.express[2]
                        if (state.middleResult) {
                            const setResult = eval(state.express[0] + state.express[1] + state.middleResult).toString()
                            state.result = setResult
                            state.express = [setResult, state.express[1]]
                            state.isResultAdd = false
                            state.operation = ''
                            state.isResultAfterEqual = true
                        }
                    }
                    if (state.express.length === 3) {
                        state.middleResult = state.result
                    }
                    if (state.result === 'Infinity') {
                        state.result = 'Не определено'
                        state.express = []
                    }
                    if (state.result.includes('.') && state.result.length > 15) {
                        state.result = state.result.substring(-0, 14) + (Number(state.result[15]) + 1 === 0 ? null : (state.result[15]) + 1)
                        if (state.result[state.result.length - 1] === '0') {
                            state.result = state.result.substring(state.result.length - 1, 1)
                        }
                    }
                    if (state.result.includes('.') && !state.isResultAdd) {
                        let countNull = ''
                        for (let i = state.result.indexOf('.'); i < state.result.length; i++) {
                            countNull += '0'
                            if (state.result[i] === state.result[i + 1] && state.result[i + 2] === state.result[i]) {
                                const NumberForRound = Number(1 + countNull)
                                const setReult = Math.round(Number(state.result) * NumberForRound) / NumberForRound
                                state.result = setReult.toString()
                                return
                            }
                        }
                    }
                    if (state.result.length < 17) {
                        state.resultForRender = state.result.toString().replace('.', ',')
                    }
                    else {
                        state.resultForRender = state.result.toString().replace('.', ',').slice(0, MAX_VIEW_SIZE) + '...'
                    }
                }

            )
    }
}
)

export default calcSlice.reducer


export const {
    addNumber,
    addOperation,
    getResult
} = calcSlice.actions





