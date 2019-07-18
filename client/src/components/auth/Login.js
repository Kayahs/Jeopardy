import React from "react"
import gql from "graphql-tag"
import * as Yup from "yup"
import { useMutation } from "react-apollo-hooks"
import { Link } from "react-router-dom"
import { Formik } from "formik"

import { LOGIN_MUTATION } from "gql"
import { FormContext } from "lib"
import { EmailInput, PasswordInput, SubmitButton } from "components"

const Login = () => {
  const login = useMutation(LOGIN_MUTATION)
  const labels = {
    email: "Please enter your email.",
    password: "Please enter your password"
  }
  return (
    <Formik
      initialValues={{
        email: "",
        password: ""
      }}
      onSubmit={(values, { setSubmitting }) => {
        login({ variables: { input: values } })
        setSubmitting(false)
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email()
          .required("required"),
        password: Yup.string().required("required")
      })}
    >
      {props => (
        <FormContext.Provider value={{ ...props, labels }}>
          <form onSubmit={props.handleSubmit}>
            <React.Fragment>
              <EmailInput />
              <PasswordInput />
              <SubmitButton />
              <Link to="/sign-up">Create an Account</Link>
            </React.Fragment>
          </form>
        </FormContext.Provider>
      )}
    </Formik>
  )
}

export default Login
