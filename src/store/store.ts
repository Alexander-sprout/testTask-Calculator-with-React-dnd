import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import calc from './calc/calcReducer'
import move from './move/moveReducer'
import toggle from './toggle/toggleReducer'

export const store = configureStore({
    reducer: { calc, move, toggle }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector