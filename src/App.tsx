import React from 'react'
import { Provider } from 'react-redux'

import { HTML5Backend } from 'react-dnd-html5-backend';

import { store } from './store/store'
import { Main } from './Main'
import { DndProvider } from 'react-dnd';


export const App = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <Provider store={store}>
                <Main />
            </Provider>
        </DndProvider>
    )
}