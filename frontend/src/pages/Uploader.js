import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Dropzone } from "./../components/container/DropZone"

export default function Uploader() {
  return (
    <Layout>
      <Dropzone />
    </Layout>
  )
}
