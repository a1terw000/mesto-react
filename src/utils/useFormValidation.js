import { useCallback, useState } from "react"

export default function useFormValidation() {
  const [isValid, setIsValid] = useState(false)
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [inputValid, setInputValid] = useState({})

  function handleChange(evt) {
    const name = evt.target.name
    const value = evt.target.value
    const validationMessage = evt.target.validationMessage
    const valid = evt.target.validity.valid
    const form = evt.target.form

    setIsValid(form.checkValidity())

    setValues((oldValues) => {
      return { ...oldValues, [name]: value }
    })

    setErrors((oldErrors) => {
      return { ...oldErrors, [name]: validationMessage }
    })

    setInputValid((oldInputValid) => {
      return { ...oldInputValid, [name]: valid }
    })
  }

  function reset(data = {}) {
    setValues(data)
    setErrors({})
    setIsValid(false)
    setInputValid({})
  }

  const setValue = useCallback((name, value) => {
    setValues((oldValues) => {
      return { ...oldValues, [name]: value }
    })
  }, [])

  return { handleChange, isValid, values, errors, inputValid, reset, setValue }
}