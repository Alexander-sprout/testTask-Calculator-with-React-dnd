import React from 'react'
import styled, { css } from 'styled-components'

import { useAppDispatch, useAppSelector } from '../../store/store'
import { operationArr } from '../../interfaces'
import { CalcComponentProps } from '../../types'
import { useSortDrop } from '../../hooks'
import { addOperation } from '../../store'



export const Operations = ({ id, type, isMoved }: CalcComponentProps) => {
    const { toggle: { executeCalc } } = useAppSelector(({ root }) => root)
    const dispatch = useAppDispatch()
    const { ref, item } = useSortDrop(id, type)
    return (
        <Wrapper
            ref={isMoved ? null : ref}
            executeCalc={executeCalc}
            isDragging={item && item.type === type}>
            {operationArr.map((item, index) => <OperationButton executeCalc={executeCalc} key={index}
                onClick={() => {
                    executeCalc &&
                        dispatch(addOperation(item))
                }}
            >
                {item}</OperationButton>)}
        </Wrapper>
    )
}

type ExecuteCalcProps = {
    executeCalc: boolean,
    isDragging?: boolean
}

const Wrapper = styled.div<ExecuteCalcProps>`
display:flex;
flex-direction:row;
width: 240px;
height:60px;
&:hover{
    ${({ executeCalc }) => !executeCalc && css`cursor:move`}
}
${({ isDragging }) => isDragging && css`
    opacity:0.3;
  `}
`

const OperationButton = styled.button<ExecuteCalcProps>`
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
        ${({ executeCalc }) => executeCalc
        ? css`cursor:pointer;
         border: 2px solid #5D5FEF;
        `
        : css`cursor:move`
    }
    }
    `