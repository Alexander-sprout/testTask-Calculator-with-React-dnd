import React from 'react'
import styled from 'styled-components'
import { HiOutlineEye } from 'react-icons/hi'
import { GoCode } from 'react-icons/go'

import { useAppDispatch, useAppSelector } from '../store/store'
import { calculator, constructor } from '../store/toggle/toggleReducer'

export const ActionBar = () => {
    const dispatch = useAppDispatch()
    const { toggle: { executeCalc } } = useAppSelector(({ root }) => root)
    return (
        <Container>
            <RunTimeButton executeCalc={executeCalc} onClick={() => dispatch(calculator())}>
                <RunTime executeCalc={executeCalc}>
                    <HiOutlineEye size={20} />
                </RunTime>
                Runtime
            </RunTimeButton>
            <ConstructorButton executeCalc={executeCalc} onClick={() => dispatch(constructor())}>
                <Constructor executeCalc={executeCalc}>
                    <GoCode size={15} />
                </Constructor>
                Constructor
            </ConstructorButton>
        </Container>
    )
}
type ExecuteCalcProps = {
    executeCalc: boolean,
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

const RunTimeButton = styled.button<ExecuteCalcProps>`
    background-color: ${({ executeCalc }) => executeCalc ? '#ffffff' : '#F3F4F6'};
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:row;
    gap:7px;
    width:108px;
    border-radius:5px;
    border:${({ executeCalc }) => executeCalc ? '1px solid #E2E3E5' : '0px'};
    font-family: 'Inter';
    font-weight: 500;
    font-size: 14px;
    color: #4D5562;
    margin-top:1px;
    margin-bottom:1px;
    margin-left:1px;
`

const ConstructorButton = styled.button<ExecuteCalcProps>`
    background-color: ${({ executeCalc }) => executeCalc ? '#F3F4F6' : '#ffffff'};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 7px;
    width: 133px;
    border-radius: 5px;
    border:${({ executeCalc }) => executeCalc ? '0px' : '1px solid #E2E3E5'};
    font-family: 'Inter';
    font-weight: 500;
    font-size: 14px;
    color: #4D5562;
    margin-top:1px;
    margin-bottom:1px;
    margin-right:1px;
`

const RunTime = styled.div<ExecuteCalcProps>`
    color: ${({ executeCalc }) => executeCalc ? '#5D5FEF' : '#4D5562'};
`
const Constructor = styled.div<ExecuteCalcProps>`
    color: ${({ executeCalc }) => executeCalc ? '#4D5562' : '#5D5FEF'};
`



