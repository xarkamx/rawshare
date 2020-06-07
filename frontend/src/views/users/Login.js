import React, { useState } from "react"
import { SimpleInput } from "./../../components/Inputs/SimpleInput"
import { AuthFetch } from "../../utils/AsyncFetch/AuthFetch"
import { useCState } from "./../../utils/hooks/simpleHooks"
import { LoginManager } from "../../utils/LoginManager"
import { Link } from "@reach/router"
import { FaButton } from "../../components/Icons/FontIcon"

import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"

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

export function UserIcon() {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  let isLogged = () => {
    let lm = new LoginManager()
    return lm.isLogged()
  }
  return (
    <div>
      <FaButton
        icon="user"
        style={{
          background: "lightblue",
          color: "white",
          fontSize: "15px",
          alignSelf: "right",
        }}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      />

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {!isLogged() ? (
          <>
            <MenuItem onClick={handleClose}>
              <Link to="/login/">Login</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/signUp/">Sign-up</Link>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </>
        )}
      </Menu>
    </div>
  )
}
