import React from "react"
import gql from "graphql-tag"
import * as Yup from "yup"
import { useMutation } from "react-apollo-hooks"
import { Link } from "react-router-dom"
import { Formik } from "formik"

import { LOGIN_MUTATION } from "gql/mutations"
import { FormContext } from "lib/contexts"
import { EmailInput, PasswordInput } from "components/form"

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
        console.log("submitting")
        login({ variables: { input: values } })
        setSubmitting(false)
        console.log("submitting done")
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
            </React.Fragment>
            <button type="submit" disabled={props.isSubmitting}>
              Submit
            </button>
          </form>
        </FormContext.Provider>
      )}
    </Formik>
  )
}

export default Login
