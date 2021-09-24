import styled from 'styled-components'

const Header = styled.View`
    height: 50px;
    background: #212121;
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: center;
    ${({ back }) => back && `
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    `}
`

const Title = styled.Text`
    text-align: center;
    color: #fff;
    align-self: center;
`

const Back = styled.TouchableOpacity`
    height: 20px;
    
`

export { Header, Title, Back }
