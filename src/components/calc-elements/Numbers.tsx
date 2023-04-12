import React from 'react'
import styled, { css } from 'styled-components'

import { useAppSelector } from '../../store/store'
import { NumbersArr } from '../../interfaces'
import { CalcComponentProps, isCalcProps } from '../../types'
import { useMoveToUIList, useSortDrop } from '../../store/move/hooks'
import { useEnteringNumbers } from '../../store/calc/hooks'


export const Numbers = ({ id, type, isMoved }: CalcComponentProps) => {
    const isCalc = useAppSelector(({ toggle }) => toggle.executeCalc)
    const { addNumber } = useEnteringNumbers()
    const { deleteElement } = useMoveToUIList()
    const addSimbol = (simb: string) => {
        if (isCalc) {
            addNumber(simb)

        }
    }

    const { ref, item } = useSortDrop(id, type)
    return (
        <Container
            onDoubleClick={() => deleteElement(type)}
            ref={isMoved ? null : ref}
            isCalc={isCalc}
            isDragging={item && item.type === type}
        >
            {NumbersArr.map((item, index) => <NumButton isCalc={isCalc} key={index}
                onClick={() => addSimbol(item)}
            >{item}</NumButton>)}
            <NullButton isCalc={isCalc} onClick={() => addSimbol('0')}>0</NullButton>
            <NumButton isCalc={isCalc} onClick={() => addSimbol('.')}>,</NumButton>
        </Container>
    )
}

const Container = styled.div<isCalcProps>`
width:240px;
height:224px;
display:flex;
flex-wrap: wrap;
justify-content:flex-start;
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

const NullButton = styled.button<isCalcProps>`
     width:152px;
    height:48px;
    margin:auto;
    font-family:'inter';
    font-weight:500;
    background-color:#ffffff;
    border: 1px solid #E2E3E5;
    border-radius:6px;
    font-size:14px;
    ${({ isCalc }) =>
        isCalc && css`
        &:hover {
          cursor: pointer;
          border: 2px solid #5D5FEF;
        }
      `
    }
    ${({ isCalc }) => !isCalc && css`
    &:hover{
        cursor:move
    }
`
    }
`

const NumButton = styled.button<isCalcProps>`
    width:72px;
    height:48px;
    margin:auto;
    font-family:'inter';
    font-weight:500;
    background-color:#ffffff;
    border: 1px solid #E2E3E5;
    border-radius:6px;
    font-size:14px;
    ${({ isCalc }) =>
        isCalc && css`
        &:hover {
          cursor: pointer;
          border: 2px solid #5D5FEF;
        }
      `
    }
    ${({ isCalc }) => !isCalc && css`
    &:hover{
        cursor:move
    }
`
    }
`