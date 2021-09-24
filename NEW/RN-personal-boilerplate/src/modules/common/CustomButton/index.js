import React from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'

const CustomButton = ({ onPress, text, marginBottom, secondary, link }) => (
	<StyledButton
		onPress={onPress}
		marginBottom={marginBottom}
		secondary={secondary}
		link={link}
	>
		<CustomText secondary={secondary} link={link}>
			<FormattedMessage id={text} />
		</CustomText>
	</StyledButton>
)

const StyledButton = styled.TouchableOpacity`
    align-self: center;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 37.8px;
    border-radius: 4px;
    background-color: #5282f0;
    ${({ marginBottom }) => marginBottom && `
        margin-bottom: ${marginBottom};
    `}
    ${({ secondary }) => secondary && `
        border-radius: 3.9px;
        background-color: #fff;
        border: solid 2px #5282f0;
    `}
    ${({ link }) => link && `
        background: rgba(0, 0, 0, 0);
        border-width: 0;
        width: 20%;
        margin: 0;
    `}
`

const CustomText = styled.Text`
    color: #fff;
    ${({ secondary, link }) => (secondary || link) && `
        color: #5282f0;
    `}
`

export { CustomButton }
