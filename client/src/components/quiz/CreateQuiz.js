import React from "react"
import * as Yup from "yup"
import { useMutation } from "react-apollo-hooks"
import { Link } from "react-router-dom"
import { Formik } from "formik"

import { ADD_QUIZ_MUTATION } from "gql"
import { FormContext } from "lib"
import { SubmitButton } from "components"

const CreateQuiz = () => {
  const createQuiz = useMutation(ADD_QUIZ_MUTATION)
  const labels = {
    title: "Please enter your quiz title",
    name: "Please enter the name of your category",
    question: "Please enter your question",
    answer: "Please enter the answer"
  }
  return (
    <Formik
      initialValues={{
        title: "",
        categories: [
          {
            name: "",
            questions: [
              {
                question: "",
                answer: "",
                points: 0
              },
              {
                question: "",
                answer: "",
                points: 0
              },
              {
                question: "",
                answer: "",
                points: 0
              },
              {
                question: "",
                answer: "",
                points: 0
              },
              {
                question: "",
                answer: "",
                points: 0
              }
            ]
          },
          {
            name: "",
            questions: [
              {
                question: "",
                answer: ""
              },
              {
                question: "",
                answer: "",
                points: 0
              },
              {
                question: "",
                answer: "",
                points: 0
              },
              {
                question: "",
                answer: "",
                points: 0
              },
              {
                question: "",
                answer: "",
                points: 0
              }
            ]
          },
          {
            name: "",
            questions: [
              {
                question: "",
                answer: "",
                points: 0
              },
              {
                question: "",
                answer: "",
                points: 0
              },
              {
                question: "",
                answer: "",
                points: 0
              },
              {
                question: "",
                answer: "",
                points: 0
              },
              {
                question: "",
                answer: "",
                points: 0
              }
            ]
          },
          {
            name: "",
            questions: [
              {
                question: "",
                answer: "",
                points: 0
              },
              {
                question: "",
                answer: "",
                points: 0
              },
              {
                question: "",
                answer: "",
                points: 0
              },
              {
                question: "",
                answer: "",
                points: 0
              },
              {
                question: "",
                answer: "",
                points: 0
              }
            ]
          },
          {
            name: "",
            questions: [
              {
                question: "",
                answer: "",
                points: 0
              },
              {
                question: "",
                answer: "",
                points: 0
              },
              {
                question: "",
                answer: "",
                points: 0
              },
              {
                question: "",
                answer: "",
                points: 0
              },
              {
                question: "",
                answer: "",
                points: 0
              }
            ]
          }
        ]
      }}
      onSubmit={(values, { setSubmitting }) => {
        createQuiz({ variables: { input: values } })
        setSubmitting(false)
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string().required("required"),
        categories: Yup.array().of(
          Yup.object().shape({
            name: Yup.string().required("required"),
            questions: Yup.array().of(
              Yup.object().shape({
                question: Yup.string().required("required"),
                answer: Yup.string().required("required"),
                points: Yup.number()
                  .integer()
                  .required("Required")
              })
            )
          })
        )
      })}
    >
      {props => (
        <FormContext.Provider value={{ ...props, labels }}>
          <form onSubmit={props.handleSubmit}>
            <React.Fragment>
              <SubmitButton />
            </React.Fragment>
          </form>
        </FormContext.Provider>
      )}
    </Formik>
  )
}

export default CreateQuiz
