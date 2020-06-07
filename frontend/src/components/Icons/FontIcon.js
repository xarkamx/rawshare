import React, { Component } from "react"
import "./scss/all.min.scss"
import { IconButton } from "@material-ui/core"
export class FontIcon extends Component {
  render() {
    const { icon, ...rest } = this.props
    return <i className={`fa fa-${icon}`} {...rest} />
  }
}
export function FaButton({ icon, ...rest }) {
  return (
    <IconButton {...rest}>
      <FontIcon icon={icon} />
    </IconButton>
  )
}
