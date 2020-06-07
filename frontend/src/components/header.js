import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { GridContainer, GridItem } from "./Grid/Grid"
import { SignContainer, UserIcon } from "../views/users/Login"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `#efefef`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        padding: `10px`,
      }}
    >
      <GridContainer>
        <GridItem xs={4}>
          <h1 style={{ margin: 0, textAlign: "center" }}>
            <Link
              to="/"
              style={{
                color: `#555`,
                textDecoration: `none`,
              }}
            >
              {siteTitle}
            </Link>
          </h1>
        </GridItem>
        <GridItem xs={4}></GridItem>

        <GridItem xs={4} className={"loginLinks"}>
          <UserIcon />
        </GridItem>
      </GridContainer>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
