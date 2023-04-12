import React from 'react'
import styled, { css } from 'styled-components'

import { useAppSelector } from '../../store/store'
import { CalcComponentProps, IsCalcAndInUiListProps, ViewResultProps, } from '../../types'
import { useMoveToUIList, useSortDrop } from '../../store/move/hooks'

export const Display = ({ id, type }: CalcComponentProps) => {
    const isCalc = useAppSelector(({ toggle }) => toggle.executeCalc)
    const uiList = useAppSelector(({ move }) => move.uiList)
    const { ref, item } = useSortDrop(id, type)
    const { deleteElement } = useMoveToUIList()
    const resultFromRender = useAppSelector(({ calc }) => calc.resultForRender)
    return (
        <Wrapper
            onDoubleClick={() => deleteElement(type)}
            ref={ref}
            isCalc={isCalc}
            isDragging={item && item.type === type}
            inUiList={uiList.some(item => item.type === type)}
        >
            <Container>
                <ViewResult resultForRender={resultFromRender}>
                    {resultFromRender}
                </ViewResult>
            </Container>
        </Wrapper>
    )
}
const Wrapper = styled.div<IsCalcAndInUiListProps>`
display:flex;
justify-content:center;
align-items:center;
    width:240px;
    height:60px;
    &:hover {
    ${({ isCalc, inUiList }) => {
        if (!isCalc && !inUiList) {
            return css`
          cursor: move;
        `;
        }
        if (inUiList) {
            return css`
          cursor: not-allowed;
        `;
        }
    }}
  }
  ${({ isDragging }) => isDragging && css`
    opacity:0.3;
  `}
  `

const Container = styled.div`
display: flex;
width: 232px;
height: 52px;
justify-content: flex-end;
align-items: center;
border-radius: 6px;
background: #F3F4F6;
`

const ViewResult = styled.div<ViewResultProps>`
font-family: 'inter';
font-weight: 800;
padding: 7px;
font-size:${({ resultForRender }) => {
        if (resultForRender.toString() === 'Не определено') {
            return '24px';
        }
        if (resultForRender.toString().length > 9) {
            return '19px';
        }
        else {
            return '36px';
        }
    }
    };
`