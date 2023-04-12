import React from 'react'
import styled, { css } from 'styled-components'

import { useAppSelector } from '../../store/store'
import { operationArr } from '../../interfaces'
import { CalcComponentProps, isCalcProps } from '../../types'
import { useMoveToUIList, useSortDrop } from '../../store/move/hooks'
import { useEnteringOperations } from '../../store/calc/hooks/useEnteringOperations'



export const Operations = ({ id, type, isMoved }: CalcComponentProps) => {
    const isCalc = useAppSelector(({ toggle }) => toggle.executeCalc)
    const { ref, item } = useSortDrop(id, type)
    const { addOperation } = useEnteringOperations()
    const { deleteElement } = useMoveToUIList()
    return (
        <Wrapper
            onDoubleClick={() => deleteElement(type)}
            ref={isMoved ? null : ref}
            isCalc={isCalc}
            isDragging={item && item.type === type}>
            {operationArr.map((item, index) => <OperationButton isCalc={isCalc} key={index}
                onClick={() => {
                    isCalc &&
                        addOperation(item)
                }}
            >
                {item}</OperationButton>)}
        </Wrapper>
    )
}

const Wrapper = styled.div<isCalcProps>`
display:flex;
flex-direction:row;
width: 240px;
height:60px;
&:hover{
    ${({ isCalc }) => !isCalc && css`cursor:move`}
}
${({ isDragging }) => isDragging && css`
    opacity:0.3;
  `}
`

const OperationButton = styled.button<isCalcProps>`
    width:52px;
    height:48px;
    margin:auto;
    font-family:'inter';
    font-weight:500;
    background-color:#ffffff;
    border: 1px solid #E2E3E5;
    border-radius:6px;
    font-size:14px;
    &:hover{
        ${({ isCalc }) => isCalc
        ? css`cursor:pointer;
         border: 2px solid #5D5FEF;
        `
        : css`cursor:move`
    }
    }
    `