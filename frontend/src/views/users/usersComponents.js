import React, { useState, useEffect } from "react"

import { SimpleInput } from "./../../components/Inputs/SimpleInput"
import { AuthFetch } from "../../utils/AsyncFetch/AuthFetch"
import { useCState } from "./../../utils/hooks/simpleHooks"
import { optionalFn } from "../../Core/helpers"
export function SignForm() {
  const [state, setState] = useCState({
    username: "",
    email: "",
    password: "",
  })
  const [valid, setValidation] = useState(false)

  let validate = () => {
    let values = Object.values(state)
    setValidation(!values.includes(""))
  }
  useEffect(() => {
    validate()
  }, [state])

  return (
    <form
      onSubmit={ev => {
        ev.preventDefault()
        let fetch = new AuthFetch("/users")
        fetch.post(state)
      }}
    >
      <UserInput
        required
        title="Username"
        type="text"
        name="username"
        onBlur={({ value }, valid) => {
          setState({ username: valid ? value : "" })
        }}
      />
      <UserInput
        required
        title="e-mail"
        name="email"
        type="email"
        onBlur={({ value }, valid) => {
          setState({ email: valid ? value : "" })
        }}
      />
      <PasswordInputs
        onValidate={(p1, p2, valid) => {
          setState({ password: valid ? p1 : "" })
        }}
      />
      {valid ? <button>Registrate</button> : ""}
    </form>
  )
}
export function UserInput({ name, onBlur, ...rest }) {
  let [state, setState] = useCState({
    error: 0,
    errorMessage: "Looks like this user already exists",
  })
  let { error, errorMessage } = state
  return (
    <SimpleInput
      errorStatus={error}
      errorMessage={errorMessage}
      {...rest}
      onBlur={async ({ target }) => {
        let fetch = new AuthFetch("/users")
        let filter = {}
        filter[name] = target.value
        let data = await fetch.get(filter)
        if (data.length > 0) {
          setState({
            error: 1,
          })
        } else {
          setState({
            error: 0,
          })
        }

        optionalFn(onBlur)(target, data.length == 0)
      }}
    />
  )
}
export function PasswordInputs({ onValidate }) {
  let [state, setState] = useCState({
    password: "",
    passwordVerify: "",
    error: 0,
  })
  let { error, password, passwordVerify } = state
  let validatePassword = (password1, password2) => {
    if (password1 == "" || password2 == "") {
      return false
    }
    const equal = password1 == password2
    if (equal) {
      setState({ error: 0 })
    } else {
      setState({ error: 1 })
    }

    optionalFn(onValidate)(password1, password2, equal)
  }
  return (
    <>
      <SimpleInput
        onChange={({ target }) => {
          setState({ password: target.value })
          validatePassword(target.value, passwordVerify)
        }}
        title="password"
        required
        type="password"
        value={password}
      />
      <SimpleInput
        onChange={({ target }) => {
          setState({ passwordVerify: target.value })
          validatePassword(password, target.value)
        }}
        title="Verify password"
        errorStatus={error}
        errorMessage={"the passwords don't match"}
        required
        type="password"
        value={passwordVerify}
      />
    </>
  )
}
