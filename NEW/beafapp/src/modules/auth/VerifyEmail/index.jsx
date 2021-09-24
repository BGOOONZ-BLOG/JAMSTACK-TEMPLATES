import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose, lifecycle, withState } from 'recompose'
import { verifyEmail } from '../actions'
import { Container, SEO, Loading } from '../../../components/common'
import { Card, Center, Wrapper, ImgWrapper } from '../styles'
import congratsIllustration from '../assets/congrats.svg'

const VerifyEmail = ({ loading, error }) => (
  <Wrapper as={Container}>
    <SEO
      url="/email/confirm"
      title="Verify your email"
      description="Confirm your email to secure your account"
    />
    <Card>
      <Center>
        {loading ? (
          <Loading />
        ) : error ? (
          <h2>
            {error} Please send us an email:{' '}
            <a href="mailto:beafapp@gmail.com" target="_top">
              beafapp@gmail.com
            </a>
          </h2>
        ) : (
          <div>
            <ImgWrapper>
              <img src={congratsIllustration} alt="congrats" />
            </ImgWrapper>
            <h2>
              Thank you for confirming your email,{' '}
              <Link to="/">Go back home</Link>
            </h2>
          </div>
        )}
      </Center>
    </Card>
  </Wrapper>
)

const mapStateToProps = ({ auth }) => ({
  errors: auth.errors,
})

const enhance = compose(
  withState('error', 'setError', null),
  withState('loading', 'setLoading', true),
  connect(
    mapStateToProps,
    {
      verifyEmail,
    }
  ),
  lifecycle({
    componentDidMount() {
      const url = new URL(window.location.href)
      const token = url.searchParams.get('token')

      if (token) {
        this.props.verifyEmail(token)
        this.props.setLoading(false)
      } else {
        this.props.history.push('/')
      }
    },
    componentWillReceiveProps(nextProps) {
      if (nextProps.errors && nextProps.errors.error) {
        this.props.setError(nextProps.errors.error)
      }
    },
  })
)

export default enhance(VerifyEmail)
