import React from 'react'
import Spinner from 'react-spinkit'
import * as Yup from 'yup'
import { Field, Form, withFormik, ErrorMessage } from 'formik'
import { compose, withStateHandlers, withState } from 'recompose'
import { connect } from 'react-redux'
import Select from 'react-select'
import Switch from 'react-switch'
import { addPost } from '../actions'
import {
  InputField,
  Error,
  Container,
  Button,
} from '../../../components/common'
import {
  Card,
  Center,
  Flex,
  Item,
  Wrapper,
  Label,
  CustomSelect,
  CustomSwitch,
  MacroWrapper,
  Info,
  ProgressBar,
} from './styles'
import UploadIcon from '../assets/upload.svg'
import categories from './categories.json'

const AddPost = ({
  values,
  isSubmitting,
  uploadFileAfter,
  uploadFileBefore,
  preview,
  preview_2,
  setFieldValue,
  setFieldTouched,
  progress,
}) => (
  <Wrapper as={Container}>
    <ProgressBar progress={progress > 0 && progress} />
    <Card>
      <Form>
        <Flex>
          <Item>
            {preview && <img src={preview} alt="preview before" />}
            <Label
              bg={UploadIcon}
              htmlFor="img_1"
              label="1"
              preview_1={preview}
            >
              <input
                onChange={e => uploadFileBefore(e)}
                type="file"
                accept="image/*"
                id="img_1"
                required
              />
            </Label>
          </Item>
          <Item>
            {preview_2 && <img src={preview_2} alt="preview before" />}
            <Label
              bg={UploadIcon}
              htmlFor="img_2"
              label="2"
              preview_2={preview_2}
            >
              <input
                onChange={e => uploadFileAfter(e)}
                type="file"
                accept="image/*"
                id="img_2"
                required
              />
            </Label>
          </Item>
        </Flex>
        <InputField label="Title*">
          <Field type="text" name="title" />
          <ErrorMessage component={Error} name="title" />
        </InputField>
        <InputField label="Category*">
          <CustomSelect
            as={Field}
            component={Select}
            options={categories}
            onChange={({ value }) => setFieldValue('category', value)}
            onBlur={() => setFieldTouched('category')}
            name="category"
          />
          <ErrorMessage component={Error} name="category" />
        </InputField>
        <InputField label="Description">
          <Field component="textarea" rows="8" type="text" name="description" />
          <ErrorMessage component={Error} name="description" />
        </InputField>
        <InputField label={!values.private ? 'Public' : 'Private'}>
          <MacroWrapper>
            <CustomSwitch
              as={Field}
              component={Switch}
              onChange={() => setFieldValue('private', !values.private)}
              onBlur={() => setFieldTouched('private')}
              name="private"
              uncheckedIcon={false}
              checkedIcon={false}
              checked={values.private}
              id="normal-switch"
            />
          </MacroWrapper>
          <ErrorMessage component={Error} name="private" />
        </InputField>
        <InputField label={!values.unbiased ? 'Biased' : 'Unbiased'}>
          <MacroWrapper>
            <CustomSwitch
              as={Field}
              component={Switch}
              onChange={() => setFieldValue('unbiased', !values.unbiased)}
              onBlur={() => setFieldTouched('unbiased')}
              name="unbiased"
              uncheckedIcon={false}
              checkedIcon={false}
              checked={values.unbiased}
              id="normal-switch"
            />
          </MacroWrapper>
          <ErrorMessage component={Error} name="unbiased" />
        </InputField>
        <Info href="https://beafapp.com/unbiased-posts" target="__blank">
          Learn more about Unbiased posts
        </Info>
        <Center>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <Spinner name="circle" color="white" />
            ) : (
              <span>SUBMIT</span>
            )}
          </Button>
        </Center>
      </Form>
    </Card>
  </Wrapper>
)

const enhance = compose(
  connect(
    null,
    { addPost }
  ),
  withState('progress', 'setProgress', 0),
  withState('intervalId', 'setIntervalId', null),
  withStateHandlers(
    {
      img: '',
      preview: '',
      img_2: '',
      preview_2: '',
    },
    {
      setIntervalId: () => value => ({ intervalID: value }),
      startProgress: (
        _state,
        { progress, setProgress, setIntervalId }
      ) => () => {
        const aye = setInterval(() => {
          if (progress > 100) {
            return clearInterval(aye)
          }
          return setProgress(progress++)
        }, 500)
        setIntervalId(aye)
      },
      stopProgress: (_state, { intervalId }) => () => {
        clearInterval(intervalId)
        return {
          progress: 100,
        }
      },
      uploadFileBefore: () => e => {
        const { files } = e.target
        const file = files[0]
        const data = new FormData() // eslint-disable-line
        data.append('upload_preset', 'rambs0b2')
        if (file && file.name) {
          data.append('file', file, file.name)

          return {
            img: data,
            preview: URL.createObjectURL(e.target.files[0]),
          }
        }
        return {
          img: '',
          preview: '',
        }
      },
      uploadFileAfter: () => e => {
        const { files } = e.target
        const file = files[0]
        const data = new FormData() // eslint-disable-line
        data.append('upload_preset', 'rambs0b2')
        if (file && file.name) {
          data.append('file', file, file.name)

          return {
            img_2: data,
            preview_2: URL.createObjectURL(e.target.files[0]),
          }
        }
        return {
          img_2: '',
          preview_2: '',
        }
      },
    }
  ),
  withFormik({
    mapPropsToValues: () => ({
      title: '',
      description: '',
      category: '',
      private: false,
      unbiased: false,
    }),
    validationSchema: () =>
      Yup.object().shape({
        title: Yup.string()
          .min(2, 'Title has to be longer than 2 characters!')
          .max(40, 'Title has to be less than 40 characters!')
          .required(),
        description: Yup.string()
          .min(2, 'Description has to be longer than 2 characters!')
          .max(120, 'Description has to be less than 120 characters!'),
        category: Yup.string().required('You must select a category'),
        private: Yup.bool().required('Required field'),
        unbiased: Yup.bool().required('Required field'),
      }),
    handleSubmit: (
      values,
      {
        props: { addPost, img, img_2, startProgress, stopProgress },
        setErrors,
        setSubmitting,
        resetForm,
      }
    ) => {
      startProgress()
      addPost(
        img,
        img_2,
        values,
        setErrors,
        setSubmitting,
        resetForm,
        stopProgress
      )
    },
  })
)

export default enhance(AddPost)
