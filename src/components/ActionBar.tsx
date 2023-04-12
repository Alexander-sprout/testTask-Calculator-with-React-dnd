import React from 'react'
import styled from 'styled-components'
import { HiOutlineEye } from 'react-icons/hi'
import { GoCode } from 'react-icons/go'

import { useAppDispatch, useAppSelector } from '../store/store'
import { calculator, constructor } from '../store/toggle/toggleReducer'
import { isCalcProps } from '../types'

export const ActionBar = () => {
    const dispatch = useAppDispatch()
    const isCalc = useAppSelector(({ toggle }) => toggle.executeCalc)
    return (
        <Container>
            <RunTimeButton isCalc={isCalc} onClick={() => dispatch(calculator())}>
                <RunTime isCalc={isCalc}>
                    <HiOutlineEye size={20} />
                </RunTime>
                Runtime
            </RunTimeButton>
            <ConstructorButton isCalc={isCalc} onClick={() => dispatch(constructor())}>
                <Constructor isCalc={isCalc}>
                    <GoCode size={15} />
                </Constructor>
                Constructor
            </ConstructorButton>
        </Container>
    )
}

const Container = styled.div`
    display:flex;
    flex-direction:row;
    width:243px;
    height:38px;
    border-radius:6px;
    background-color:#F3F4F6;
    gap:1px;
`

const RunTimeButton = styled.button<isCalcProps>`
    background-color: ${({ isCalc }) => isCalc ? '#ffffff' : '#F3F4F6'};
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:row;
    gap:7px;
    width:108px;
    border-radius:5px;
    border:${({ isCalc }) => isCalc ? '1px solid #E2E3E5' : '0px'};
    font-family: 'Inter';
    font-weight: 500;
    font-size: 14px;
    color: #4D5562;
    margin-top:1px;
    margin-bottom:1px;
    margin-left:1px;
`

const ConstructorButton = styled.button<isCalcProps>`
    background-color: ${({ isCalc }) => isCalc ? '#F3F4F6' : '#ffffff'};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 7px;
    width: 133px;
    border-radius: 5px;
    border:${({ isCalc }) => isCalc ? '0px' : '1px solid #E2E3E5'};
    font-family: 'Inter';
    font-weight: 500;
    font-size: 14px;
    color: #4D5562;
    margin-top:1px;
    margin-bottom:1px;
    margin-right:1px;
`

const RunTime = styled.div<isCalcProps>`
    color: ${({ isCalc }) => isCalc ? '#5D5FEF' : '#4D5562'};
`
const Constructor = styled.div<isCalcProps>`
    color: ${({ isCalc }) => isCalc ? '#4D5562' : '#5D5FEF'};
`



