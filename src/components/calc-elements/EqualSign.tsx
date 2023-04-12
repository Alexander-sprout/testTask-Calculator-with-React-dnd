import React from 'react'
import styled, { css } from 'styled-components'

import { CalcComponentProps, isCalcProps } from '../../types'
import { useAppSelector } from '../../store/store'
import { useGetCalcResult } from '../../store/calc/hooks'
import { useMoveToUIList, useSortDrop } from '../../store/move/hooks'


export const EqualSign = ({ id, type, isMoved }: CalcComponentProps) => {
    const isCalc = useAppSelector(({ toggle }) => toggle.executeCalc)
    const { getResult } = useGetCalcResult()
    const { deleteElement } = useMoveToUIList()
    const { ref, item } = useSortDrop(id, type)
    return (
        <Container
            onDoubleClick={() => deleteElement(type)}
            ref={isMoved ? null : ref}
            isCalc={isCalc}
            isDragging={item && item.type === type}            >
            <ResultButton isCalc={isCalc} onClick={() => isCalc && getResult()}>=</ResultButton>
        </Container>
    )
}

const ResultButton = styled.div<isCalcProps>`
display:flex;
justify-content:center;
align-items:center;
    width:232px;
    height:64px;
    background-color: #5D5FEF;
    border-radius: 6px;
    color:white;
    font-size:14px;
    font-family:'inter';
    font-weight:500;
    &:hover{
        ${({ isCalc }) => isCalc
        ? css`cursor:pointer`
        : css`cursor:mover`
    }
    }
    `
const Container = styled.div<isCalcProps>`
    width:240px;
    height:72px;
    display:flex;
    justify-content:center;
    align-items:center;
    ${({ isCalc }) => !isCalc && css`
    &:hover{
        cursor:move
    }
    `
    }
   ${({ isDragging }) => isDragging && css`
    opacity:0.3;
  `}
`