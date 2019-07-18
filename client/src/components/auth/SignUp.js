import React from "react"
import * as Yup from "yup"
import { useMutation } from "react-apollo-hooks"
import { Link } from "react-router-dom"
import { Formik } from "formik"

import { SIGNUP_MUTATION } from "gql"
import { FormContext } from "lib"
import { NameInput, EmailInput, PasswordInput, SubmitButton } from "components"

const SignUp = () => {
  const signup = useMutation(SIGNUP_MUTATION)
  const labels = {
    fullname: "Please enter your name.",
    email: "Please enter your email.",
    password: "Please enter your password"
  }
  return (
    <Formik
      initialValues={{
        fullname: "",
        email: "",
        password: ""
      }}
      onSubmit={(values, { setSubmitting }) => {
        signup({ variables: { input: values } })
        setSubmitting(false)
      }}
      validationSchema={Yup.object().shape({
        fullname: Yup.string(),
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
              <NameInput />
              <EmailInput />
              <PasswordInput />
              <SubmitButton />
              <Link to="/">Existing Account?</Link>
            </React.Fragment>
          </form>
        </FormContext.Provider>
      )}
    </Formik>
  )
}

export default SignUp
