export type CalcComponentProps = {
    id: number,
    type: UiType,
    isMoved?: boolean,
}

export type DataFromSort = {
    drag: {
        id: number,
        type: UiType,
    },
    shouldBeFirst?: boolean
    drop: {
        id: number,
        type: UiType | string
    }
}

export type UiType = 'result' | 'operations' | 'numbers' | 'equal-sign'


export type UiItem = {
    type: UiType,
    id: number,
    shouldBeFirst?: boolean
}

export type DeleteElement = {
    type: string,
    executeCalc: boolean
}