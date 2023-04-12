import { createSlice } from "@reduxjs/toolkit";


const TooggleSlice = createSlice({
    name: 'toggle',
    initialState: {
        executeCalc: false as boolean
    },
    reducers: {
        constructor: (state: { executeCalc: boolean }) => {
            state.executeCalc = false
        },
        calculator: (state: { executeCalc: boolean }) => {
            state.executeCalc = true
        },
    }
})



export default TooggleSlice.reducer

export const { constructor, calculator } = TooggleSlice.actions