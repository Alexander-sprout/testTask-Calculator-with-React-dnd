import styled from 'styled-components'
import React from 'react'

import { Calc } from './components/lists/Calc'
import { CalcExecute } from './components/lists/CalcExecute'
import { ActionBar } from './components/ActionBar'


export const Main = () => {
    return (
        <Wrapper>
            <Content>
                <ToggleWrapper>
                    <ActionBar />
                </ToggleWrapper>
                <Container>
                    <Calc />
                    <CalcExecute />
                </Container >
            </Content>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    width:100vw;
    height:100vh;
`

const Container = styled.div`
    display:flex;
    flex-direction:row;
    gap:50px;
    `

const Content = styled.div`
    display:flex;
    flex-direction:column;
    width:540;
    justify-content:center;
    align-items:center;
    gap:30px;
`

const ToggleWrapper = styled.div`
    display:flex;
    justify-content:flex-end;
    width:100%;
`
