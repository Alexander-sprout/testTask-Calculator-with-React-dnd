import React from 'react'
import { useDrop } from 'react-dnd'
import styled, { css } from 'styled-components'

import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../store/store'
import { Display, EqualSign, Numbers, Operations } from '../../components/calc-elements'
import Img from '../../assets/img.png'
import { useSortDrop } from '../../store/move/hooks/useSortDrop'
import { UiItem, isSelectedProps } from '../../types'
import { useMoveToUIList } from '../../store/move/hooks/useMoveToUIList'



export interface Item {
    id: number
    text: string
}

export interface ContainerState {
    cards: Item[]
}

export const CalcExecute = () => {
    const uiList = useAppSelector(({ move }) => move.uiList)
    const isSelected = useAppSelector(({ move }) => move.focusDropElelement)
    const { moveToUIList } = useMoveToUIList()
    const [_, dropRef] = useDrop(
        () => ({
            accept: 'KEYBOARD',
            drop: (item, monitor) => {
                moveToUIList((item as UiItem))
            },
        }),
        [moveToUIList]
    );
    const { isDragging } = useSortDrop()
    return (
        <Wrapper ref={dropRef}>
            {!uiList.length
                ? (
                    <EmptyContainer>
                        <Placeholder>
                            <img src={Img} width={20} height={20} />
                            <FirstText>
                                Перетащите сюда
                            </FirstText>
                            <SecondText>
                                Любой элемент
                            </SecondText>
                            <SecondText>
                                из левой панели
                            </SecondText>
                        </Placeholder>
                    </EmptyContainer>)

                : (
                    <Container>
                        {uiList.map(({ type, id }) => (
                            <div key={type}>
                                {type === 'result' &&
                                    <DisplayWrapper
                                        isSelected={isSelected === type}
                                        isDragging={isDragging}
                                    >
                                        <Display id={id} type={type} />
                                    </DisplayWrapper>
                                }
                                {type === 'operations' &&
                                    <CalcElementWrapper
                                        isSelected={isSelected === type}
                                        isDragging={isDragging}
                                    >
                                        <Operations id={id} type={type} />
                                    </CalcElementWrapper >
                                }
                                {type === 'numbers' &&
                                    <CalcElementWrapper
                                        isSelected={isSelected === type}
                                        isDragging={isDragging}
                                    >
                                        <Numbers id={id} type={type} />
                                    </CalcElementWrapper>
                                }
                                {type === 'equal-sign' &&
                                    <CalcElementWrapper
                                        isSelected={isSelected === type}
                                        isDragging={isDragging}
                                    >
                                        <EqualSign id={id} type={type} />
                                    </CalcElementWrapper>
                                }
                            </div>
                        ))}
                    </Container>
                )
            }
        </Wrapper>
    )
}
const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    background-image:url('../assets/imgHover.png');
    `

const Container = styled.div`
display:flex;
flex-direction:column;
gap:10px;
    width:240px;
`

const EmptyContainer = styled.div`
    display:flex;
    flex-direction:column;
background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='6' ry='6' stroke='%23C4C4C4FF' stroke-width='4' stroke-dasharray='7' stroke-dashoffset='15' stroke-linecap='butt'/%3e%3c/svg%3e");
border-radius: 6px;border-radius: 6px;    border-radius: 6px;
    border-radius: 6px;
    border-radius: 6px;
    width:243px;
    height:448px;
`
const Placeholder = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    font-family:'inter';
    margin:auto;
`

const FirstText = styled.div`
    font-weight:500;
    color:#5D5FEF;
    font-size:14px;
    margin-top:10px;
`
const SecondText = styled.div`
    font-weight:400;
    font-size:12px;
`
const DisplayWrapper = styled.div<isSelectedProps>`
 ${({ isSelected, isDragging }) => (isSelected && isDragging) && css`
    border: 2px solid #ff0000;
    border-radius:10px
    `}

`

const CalcElementWrapper = styled.div<isSelectedProps>`
${({ isSelected, isDragging }) => (isSelected && isDragging) && css`
display:flex;
align-items:center;
justify-content:center;
    border: 2px solid#5D5FEF;
    border-radius:10px
    `}
`




