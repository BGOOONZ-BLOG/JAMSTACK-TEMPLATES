import React from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'

const Title = ({ position, id, marginBottom, subtitle }) => (
	<StyledTitle position={position} marginBottom={marginBottom} subtitle={subtitle}>
		<FormattedMessage id={id} />
	</StyledTitle>
)

const StyledTitle = styled.Text`
    font-size: 17.9px;
    font-weight: bold;
    letter-spacing: 0.2px;
    text-align: center;
    color: #5282f0;
    ${({ subtitle }) => subtitle && `
        font-size: 14px;
        font-weight: normal;
    `}
    ${({ position }) => position && `
        text-align: ${position};
    `}
    ${({ marginBottom }) => marginBottom && `
        margin-bottom: 20px;
    `}
`

export { Title }
