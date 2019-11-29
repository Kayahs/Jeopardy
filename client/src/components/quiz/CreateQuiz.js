import React from "react"
import * as Yup from "yup"
import { useMutation } from "react-apollo-hooks"
import { Link } from "react-router-dom"
import { Formik } from "formik"

import { ADD_QUIZ_MUTATION } from "gql"
import { FormContext, createArray } from "lib"
import { SubmitButton, CategoryInput, QuizTitle } from "components"

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
        title: "Q",
        categories: createArray(
          {
            name: "C",
            questions: createArray(
              { question: "QQ", answer: "QA", points: 0 },
              5
            )
          },
          5
        )
      }}
      onSubmit={(values, { setSubmitting }) => {
        values.categories = values.categories.map(category => {
          const questions = category.questions.map((question, index) => ({
            ...question,
            points: 200 * (index + 1)
          }))
          return {
            ...category,
            questions
          }
        })
        console.log(values)
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
              <QuizTitle />
              <CategoryInput />
              <SubmitButton />
            </React.Fragment>
          </form>
        </FormContext.Provider>
      )}
    </Formik>
  )
}

export default CreateQuiz
