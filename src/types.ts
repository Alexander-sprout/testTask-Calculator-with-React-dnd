export type isCalcProps = {
    isCalc: boolean;
    isDragging?: boolean
};

export type IsCalcAndInUiListProps = {
    isCalc: boolean,
    inUiList: boolean,
    isDragging: boolean,
    isSelected?: boolean,
}

export type ViewResultProps = {
    resultForRender: string,
}

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
    drop: {
        id: number,
        type: UiType | string
    }
}

export type isSelectedProps = {
    isSelected: boolean,
    isDragging: boolean,
}

export type UiType = 'result' | 'operations' | 'numbers' | 'equal-sign'


export type UiItem = {
    type: UiType,
    id: number
}