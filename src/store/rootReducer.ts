import { combineReducers } from "redux";
import moveReducer from "./move/moveReducer";
import toggleReducer from "./toggle/toggleReducer";
import calcReducer from "./calc/calcReducer";


const root = combineReducers({
    move: moveReducer,
    toggle: toggleReducer,
    calc: calcReducer
})
export { toggleReducer }
export default root