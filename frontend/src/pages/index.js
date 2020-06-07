import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { UploaderGalleryButton } from "../views/GalleryManager/GalleryContainer"
import { LoginManager } from "./../utils/LoginManager"

const IndexPage = () => {
  let lm = new LoginManager()
  console.log(lm.isLogged())
  return (
    <Layout>
      <SEO title="Home" />
      {lm.isLogged() ? <UploaderGalleryButton /> : <button>Subir</button>}
    </Layout>
  )
}

export default IndexPage
