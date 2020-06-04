import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { UploaderGalleryButton } from "../views/GalleryManager/GalleryContainer"
import { LoginManager } from "./../utils/LoginManager"

const IndexPage = () => {
  let lm = new LoginManager()
  console.log(lm.isLogged())
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      {lm.isLogged() ? <UploaderGalleryButton /> : <button>Subir</button>}
      <br />
      <Link to="/page-2/">Go to page 2</Link> <br />
      <Link to="/signUp/">Sign-up</Link> <br />
      <Link to="/login/">Login</Link> <br />
      <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
    </Layout>
  )
}

export default IndexPage
