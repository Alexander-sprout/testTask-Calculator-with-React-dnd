import React from 'react'
import styled, { css } from 'styled-components'

import { useAppDispatch, useAppSelector } from '../../store/store'
import { NumbersArr } from '../../interfaces'
import { CalcComponentProps } from '../../types'
import { useSortDrop } from '../../hooks'
import { addNumber } from '../../store'


export const Numbers = ({ id, type, isMoved }: CalcComponentProps) => {
    const { toggle: { executeCalc } } = useAppSelector(({ root }) => root)
    const dispatch = useAppDispatch()
    const addSimbol = (simb: string) => {
        if (executeCalc) {
            dispatch(addNumber(simb))

        }
    }

    const { ref, item } = useSortDrop(id, type)
    return (
        <Container
            ref={isMoved ? null : ref}
            executeCalc={executeCalc}
            isDragging={item && item.type === type}
        >
            {NumbersArr.map((item, index) => <NumButton executeCalc={executeCalc} key={index}
                onClick={() => addSimbol(item)}
            >{item}</NumButton>)}
            <NullButton executeCalc={executeCalc} onClick={() => addSimbol('0')}>0</NullButton>
            <NumButton executeCalc={executeCalc} onClick={() => addSimbol('.')}>,</NumButton>
        </Container>
    )
}

type ExecuteCalcProps = {
    executeCalc: boolean,
    isDragging?: boolean
}

const Container = styled.div<ExecuteCalcProps>`
width:240px;
height:224px;
display:flex;
flex-wrap: wrap;
justify-content:flex-start;
${({ executeCalc }) => !executeCalc && css`
    &:hover{
        cursor:move
    }
`
    }
   ${({ isDragging }) => isDragging && css`
    opacity:0.3;
  `}
`

const NullButton = styled.button<ExecuteCalcProps>`
     width:152px;
    height:48px;
    margin:auto;
    font-family:'inter';
    font-weight:500;
    background-color:#ffffff;
    border: 1px solid #E2E3E5;
    border-radius:6px;
    font-size:14px;
    ${({ executeCalc }) =>
        executeCalc && css`
        &:hover {
          cursor: pointer;
          border: 2px solid #5D5FEF;
        }
      `
    }
    ${({ executeCalc }) => !executeCalc && css`
    &:hover{
        cursor:move
    }
`
    }
`

const NumButton = styled.button<ExecuteCalcProps>`
    width:72px;
    height:48px;
    margin:auto;
    font-family:'inter';
    font-weight:500;
    background-color:#ffffff;
    border: 1px solid #E2E3E5;
    border-radius:6px;
    font-size:14px;
    ${({ executeCalc }) =>
        executeCalc && css`
        &:hover {
          cursor: pointer;
          border: 2px solid #5D5FEF;
        }
      `
    }
    ${({ executeCalc }) => !executeCalc && css`
    &:hover{
        cursor:move
    }
`
    }
`