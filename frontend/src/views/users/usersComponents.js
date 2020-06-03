import React from "react"

import { SimpleInput } from "./../../components/Inputs/SimpleInput"
import { AuthFetch } from "../../utils/AsyncFetch/AuthFetch"
import { useCState } from "./../../utils/hooks/simpleHooks"
import { optionalFn } from "../../Core/helpers"
export function SignForm() {
  const [state, setState] = useCState({ username: "", email: "", password: "" })
  return (
    <form
      onSubmit={ev => {
        ev.preventDefault()
        let fetch = new AuthFetch("/users")
        fetch.post(state)
      }}
    >
      <UserNameInput
        onBlur={({ value }) => {
          setState({ username: value })
        }}
      />
      <UserMailInput
        onBlur={({ value }) => {
          setState({ email: value })
        }}
      />
      <PasswordInputs
        onValidate={(p1, p2) => {
          setState({ password: p1 })
        }}
      />
      <button>Registrate</button>
    </form>
  )
}
export function UserNameInput({ onBlur, onExistingUser }) {
  let [state, setState] = useCState({
    error: 0,
    errorMessage: "",
  })
  let { error, errorMessage } = state
  return (
    <SimpleInput
      required
      title="User Name"
      errorStatus={error}
      errorMessage={errorMessage}
      onBlur={async ({ target }) => {
        let fetch = new AuthFetch("/users")
        let data = await fetch.get({ username: target.value })
        if (data.length > 0) {
          setState({
            error: 1,
            errorMessage: "Parece que ese usuario ya esta registrado",
          })
          optionalFn(onExistingUser)(data)
        } else {
          optionalFn(onBlur)(target)
          setState({
            error: 0,
            errorMessage: "Parece que ese usuario ya esta registrado",
          })
        }
      }}
    />
  )
}
export function UserMailInput({ onBlur, onExistingUser }) {
  let [state, setState] = useCState({
    error: 0,
    errorMessage: "",
  })
  let { error, errorMessage } = state
  return (
    <SimpleInput
      required
      title="e-mail"
      type="mail"
      errorStatus={error}
      errorMessage={errorMessage}
      onBlur={async ({ target }) => {
        let fetch = new AuthFetch("/users")
        let data = await fetch.get({ email: target.value })
        if (data.length > 0) {
          setState({
            error: 1,
            errorMessage: "Parece que ese usuario ya esta registrado",
          })
          optionalFn(onExistingUser)(data)
        } else {
          optionalFn(onBlur)(target)
          setState({
            error: 0,
            errorMessage: "Parece que ese usuario ya esta registrado",
          })
        }
      }}
    />
  )
}
export function PasswordInputs({ onValidate }) {
  let [state, setState] = useCState({
    password: "",
    passwordVerify: "",
    error: 0,
    errMessage: "Parece que las contraseñas no coinciden",
  })
  let { error, password, passwordVerify } = state
  let validatePassword = (password1, password2) => {
    if (password1 == "" || password2 == "") {
      return false
    }
    if (password1 == password2) {
      setState({ error: 0 })
      optionalFn(onValidate)(password1, password2)
    } else {
      setState({ error: 1 })
    }
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
        errorMessage={"the passwords doesn't match"}
        required
        type="password"
        value={passwordVerify}
      />
    </>
  )
}
