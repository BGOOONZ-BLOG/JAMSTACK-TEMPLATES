import styled from 'styled-components'

const Footer = styled.View`
    height: 60px;
    background: #212121;
    width: 100%;
    padding-top: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const Title = styled.Text`
    text-align: center;
    color: #fff;
`

const Tab = styled.TouchableOpacity`
    padding-top: 20px;
    height: 60px;
    flex: 1;
    ${({ active }) => active && `
        background: #000;
    `}
`

export { Footer, Title, Tab }
