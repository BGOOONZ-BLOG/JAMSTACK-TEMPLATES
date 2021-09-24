import styled from 'styled-components'

const Wrapper = styled.View`
    flex: 1;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`

const Top = styled.View`
    flex: 1;
`

const Item = styled.View`
    background-color: #fff;
    flex: 2;
`

const Icon = styled.Image`
    width: 200px;
    height: 200px;
    align-self: center;
`

const Thumbnail = styled.View`
    margin-bottom: 20px;
`

export { Icon, Item, Thumbnail, Wrapper, Top }
