import React from 'react'
import styled from 'styled-components'

import {
    Display,
    EqualSign,
    Numbers,
    Operations
} from '../../components/calc-elements'
import { useAppSelector } from '../../store/store'


export const Calc = () => {
    const defaultList = useAppSelector(({ move }) => move.defaultList)
    const uiList = useAppSelector(({ move }) => move.uiList)
    const isCalc = useAppSelector(({ toggle }) => toggle.executeCalc)
    return (
        <Container>
            {!isCalc ? (
                <>
                    {defaultList.map(({ id, type }) => (
                        <div key={type}>
                            <Wrapper>
                                {type === 'result' && (uiList.some(item => item.type === type)
                                    ? <div style={{ opacity: 0.3 }}><Display id={id} type={type} /></div>
                                    : <Display id={id} type={type} />)}
                            </Wrapper>
                            <Wrapper>
                                {type === 'operations' && (uiList.some(item => item.type === type)
                                    ? <div style={{ opacity: 0.3 }}><Operations id={id} type={type} isMoved={true} /></div>
                                    : <Operations id={id} type={type} />)}
                            </Wrapper>
                            <Wrapper>
                                {type === 'numbers' && (uiList.some(item => item.type === type)
                                    ? <div style={{ opacity: 0.3 }}><Numbers id={id} type={type} isMoved={true} /></div>
                                    : <Numbers id={id} type={type} />)}
                            </Wrapper>
                            <Wrapper>
                                {type === 'equal-sign' && (uiList.some(item => item.type === type)
                                    ? <div style={{ opacity: 0.3 }}><EqualSign id={id} type={type} isMoved={true} /></div>
                                    : <EqualSign id={id} type={type} />)}
                            </Wrapper>
                        </div>
                    ))}
                </>
            ) : (
                defaultList
                    .filter((item) => !uiList.some(element => element.type === item.type))
                    .map(({ id, type }) => (
                        <div key={type}>
                            <Wrapper>
                                {type === 'result' && (uiList.some(item => item.type === type)
                                    ? <div style={{ opacity: 0.3 }}><Display id={id} type={type} /></div>
                                    : <Display id={id} type={type} />)}
                            </Wrapper>
                            <Wrapper>
                                {type === 'operations' && (uiList.some(item => item.type === type)
                                    ? <div style={{ opacity: 0.3 }}><Operations id={id} type={type} /></div>
                                    : <Operations id={id} type={type} />)}
                            </Wrapper>
                            <Wrapper>
                                {type === 'numbers' && (uiList.some(item => item.type === type)
                                    ? <div style={{ opacity: 0.3 }}><Numbers id={id} type={type} /></div>
                                    : <Numbers id={id} type={type} />)}
                            </Wrapper>
                            <Wrapper>
                                {type === 'equal-sign' && (uiList.some(item => item.type === type)
                                    ? <div style={{ opacity: 0.3 }}><EqualSign id={id} type={type} /></div>
                                    : <EqualSign id={id} type={type} />)}
                            </Wrapper>
                        </div>
                    ))
            )}
        </Container>
    );

}
const Wrapper = styled.div`
     border-radius:4px;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1);
`
const Container = styled.div`
display:flex;
flex-direction:column;
gap:10px;
    width:240px;
`