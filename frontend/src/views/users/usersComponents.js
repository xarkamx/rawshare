import React from "react"
import { SimpleInput } from "./../../components/Inputs/SimpleInput"
export function SignForm() {
  return (
    <>
      <UserNameInput />
      <SimpleInput title="Email" type="mail" value="" />
      <SimpleInput title="password" type="password" value="" />
      <SimpleInput title="Verify password" type="password" value="" />
      <button>Registrate</button>
    </>
  )
}
export function UserNameInput() {
  console.log(process.env)
  return (
    <SimpleInput
      title="User Name"
      onBlur={({ target }) => {
        console.log(target.value)
      }}
    />
  )
}
