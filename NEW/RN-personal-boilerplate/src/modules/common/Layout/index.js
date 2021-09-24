import React from 'react'
import { connect } from 'react-redux'
import { Text } from 'react-native'
import ar from 'react-intl/locale-data/ar'
import en from 'react-intl/locale-data/en'
import { addLocaleData, IntlProvider } from 'react-intl'
import localEng from '../../../messages/eng.json'
import localAr from '../../../messages/ar.json'
import CustomHeader from '../../theme/CustomHeader'
import CustomFooter from '../../theme/CustomFooter'
import { IphoneX, Wrapper } from './styles'

addLocaleData([...ar, ...en])

const Layout = ({ navigation, title, screen, children, back, theme }) => (
	<IntlProvider locale={theme.language} messages={theme.language === 'en' ? localEng : localAr} textComponent={Text}>
		<IphoneX>
			{(screen !== 'Home' && screen !== 'Tutorial' && screen !== 'Auth') && <CustomHeader title={title} back={back} goBack={navigation.goBack} />}
			<Wrapper>
				{children}
			</Wrapper>
			{(screen !== 'Home' && screen !== 'Tutorial' && screen !== 'Auth') && <CustomFooter title={screen} navigate={navigation.navigate} />}
		</IphoneX>
	</IntlProvider>
)

const mapStateToProps = ({ theme }) => ({
	theme
})

export default connect(mapStateToProps)(Layout)
