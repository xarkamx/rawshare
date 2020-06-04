import React from "react"
import { SimpleInput } from "./../../components/Inputs/SimpleInput"
import { AuthFetch } from "../../utils/AsyncFetch/AuthFetch"
import { useCState } from "./../../utils/hooks/simpleHooks"
import { LoginManager } from "../../utils/LoginManager"
export function LoginForm() {
  const [state, setState] = useCState({ username: null, password: null })
  return (
    <form
      onSubmit={async ev => {
        ev.preventDefault()
        let fetch = new AuthFetch("auth")
        let result = await fetch.post(state)
        let loginManager = new LoginManager()
        loginManager.login(result)
      }}
    >
      <SimpleInput
        title="Username"
        required
        onBlur={({ target }) => {
          console.log(target.value)
          setState({ username: target.value })
        }}
      />
      <SimpleInput
        title="Password"
        onBlur={({ target }) => {
          setState({ password: target.value })
        }}
        required
        type="password"
      />
      <button>Log In</button>
    </form>
  )
}
