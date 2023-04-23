import React from 'react'
import styled, { css } from 'styled-components'

import { useAppSelector } from '../../store/store'
import { CalcComponentProps } from '../../types'
import { useSortDrop } from '../../hooks'

export const Display = ({ id, type }: CalcComponentProps) => {
    const { ref, item } = useSortDrop(id, type, true)
    const {
        toggle: { executeCalc },
        move: { uiList },
        calc: { resultForRender }
    } = useAppSelector(({ root }) => root)
    return (
        <Wrapper
            ref={ref}
            executeCalc={executeCalc}
            focusDropElelement={item && item.type === type}
            inUiList={uiList.some(item => item.type === type)}
        >
            <Container>
                <ViewResult resultForRender={resultForRender}>
                    {resultForRender}
                </ViewResult>
            </Container>
        </Wrapper>
    )
}
type ExecuteCalcProps = {
    executeCalc: boolean,
    inUiList: boolean,
    focusDropElelement: string
}
const Wrapper = styled.div<ExecuteCalcProps>`
display:flex;
justify-content:center;
align-items:center;
    width:240px;
    height:60px;
    &:hover {
    ${({ executeCalc, inUiList }) => {
        if (!executeCalc && !inUiList) {
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
  ${({ focusDropElelement }) => focusDropElelement && css`
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
type ViewResultProps = {
    resultForRender: string
}
const ViewResult = styled.div<ViewResultProps>`
font-family: 'inter';
font-weight: 800;
padding: 7px;
font-size:${({ resultForRender }) => {
        if (resultForRender === 'Не определено') {
            return '24px';
        }
        if (resultForRender.length > 9) {
            return '19px';
        }
        else {
            return '36px';
        }
    }
    };
`