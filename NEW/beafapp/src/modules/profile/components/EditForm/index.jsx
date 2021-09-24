import React from 'react'
import Spinner from 'react-spinkit'
import { Form, withFormik, Field, ErrorMessage } from 'formik'
import { compose, withStateHandlers } from 'recompose'
import * as Yup from 'yup'
import { Button, InputField, Error } from '../../../../components/common'
import { Item, Label, Center, Card } from './styles'

const EditForm = ({
  errors,
  touched,
  uploadAvatar,
  avatar,
  username,
  isSubmitting,
  avatarPreview,
}) => (
  <Card>
    <Form>
      <Item>
        <img src={avatarPreview || avatar} alt={username} />
        <Label htmlFor="avatar">
          <input
            onChange={e => uploadAvatar(e)}
            type="file"
            accept="image/*"
            id="avatar"
          />
        </Label>
      </Item>
      <InputField
        error={errors.firstName && touched.firstName}
        label="First name"
      >
        <Field
          autoComplete="off"
          type="text"
          placeholder="First name"
          name="firstName"
        />
        <ErrorMessage name="firstName" component={Error} />
      </InputField>
      <InputField error={errors.lastName && touched.lastName} label="Surname">
        <Field
          autoComplete="off"
          type="text"
          placeholder="Last name"
          name="lastName"
        />
        <ErrorMessage name="lastName" component={Error} />
      </InputField>
      <InputField error={errors.bio && touched.bio} label="Bio">
        <Field
          autoComplete="off"
          type="text"
          component="textarea"
          rows="5"
          placeholder="Bio"
          name="bio"
        />
        <ErrorMessage name="bio" component={Error} />
      </InputField>
      <Center>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Spinner name="circle" color="white" />
          ) : (
            <span>Submit</span>
          )}
        </Button>
      </Center>
    </Form>
  </Card>
)

const enhance = compose(
  withStateHandlers(
    ({ avatar }) => ({
      stateAvatar: avatar || '',
      avatarPreview: '',
    }),
    {
      uploadAvatar: () => e => {
        const { files } = e.target
        const file = files[0]
        const data = new FormData() // eslint-disable-line
        data.append('upload_preset', 'rambs0b2')
        if (file && file.name) {
          data.append('file', file, file.name)

          return {
            stateAvatar: data,
            avatarPreview: URL.createObjectURL(e.target.files[0]),
          }
        }
        return {
          stateAvatar: '',
          avatarPreview: '',
        }
      },
    }
  ),
  withFormik({
    enableReinitialize: true,
    mapPropsToValues: ({ firstName, lastName, bio }) => {
      return {
        firstName: firstName || '',
        lastName: lastName || '',
        bio: bio || '',
      }
    },
    validationSchema: () =>
      Yup.object().shape({
        firstName: Yup.string()
          .min(2, 'First name has to be longer than 2 characters!')
          .max(20, 'First name has to be less than 20 characters')
          .required('Required field'),
        lastName: Yup.string()
          .min(2, 'First name has to be longer than 2 characters!')
          .max(20, 'Last name has to be less than 20 characters')
          .required('Required field'),
        bio: Yup.string().max(160, 'Bio has to be less than 160 characters'),
      }),
    handleSubmit(
      values,
      {
        props: { editProfile, stateAvatar, avatar },
        setErrors,
        setSubmitting,
        resetForm,
      }
    ) {
      editProfile(
        values,
        stateAvatar,
        avatar,
        setErrors,
        setSubmitting,
        resetForm
      )
    },
  })
)

export default enhance(EditForm)
