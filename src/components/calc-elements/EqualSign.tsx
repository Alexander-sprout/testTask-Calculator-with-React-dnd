import React from 'react'
import styled, { css } from 'styled-components'

import { CalcComponentProps } from '../../types'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { useSortDrop } from '../../hooks'
import { getResult } from '../../store'


export const EqualSign = ({ id, type, isMoved }: CalcComponentProps) => {
    const { toggle: { executeCalc } } = useAppSelector(({ root }) => root)
    const dispatch = useAppDispatch()
    const { ref, item } = useSortDrop(id, type)
    return (
        <Container
            ref={isMoved ? null : ref}
            executeCalc={executeCalc}
            isDragging={item && item.type === type}            >
            <ResultButton executeCalc={executeCalc} onClick={() => executeCalc && dispatch(getResult())}>=</ResultButton>
        </Container>
    )
}

type ExecuteCalcProps = {
    executeCalc: boolean,
    isDragging?: boolean
}
const ResultButton = styled.div<ExecuteCalcProps>`
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
        ${({ executeCalc }) => executeCalc
        ? css`cursor:pointer`
        : css`cursor:mover`
    }
    }
    `
const Container = styled.div<ExecuteCalcProps>`
    width:240px;
    height:72px;
    display:flex;
    justify-content:center;
    align-items:center;
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