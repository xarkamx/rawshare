import React, { Component } from "react"
import { optionalFn } from "../../Core/helpers"
import { Button } from "@material-ui/core"
export class Dropzone extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hover: false,
    }

    this.onDragOver = this.onDragOver.bind(this)
    this.onDragLeave = this.onDragLeave.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.onFilesAdded = this.onFilesAdded.bind(this)
    this.openFileDialog = this.openFileDialog.bind(this)
    this.fileInputRef = React.createRef()
  }

  /**
   * Handle file dropped into drag area
   * @param {Object} event
   */
  onDrop(event) {
    this.stopEvent(event)
    const { onFilesAdded } = this.props
    const { files } = event.dataTransfer

    optionalFn(onFilesAdded)(this.fileListToArray(files))

    this.setState({ hover: false })
  }

  /**
   * Handle file being dragged over drag area
   * @param {Object} event
   */
  onDragOver(event) {
    this.stopEvent(event)
    this.setState({ hover: true })
  }

  /**
   * Handle file being dragged out of drag area
   * @param {Object} event
   */
  onDragLeave(event) {
    this.stopEvent(event)
    this.setState({ hover: false })
  }

  /**
   * Handle adding files through file dialog
   * @param {Object} event
   */
  onFilesAdded(event) {
    const { files } = event.target
    this.props.onFilesAdded(this.fileListToArray(files))
  }

  /**
   * Opens file system dialog
   */
  openFileDialog() {
    this.fileInputRef.current.click()
  }

  /**
   * Prevent default event. Just in case
   */
  stopEvent = event => {
    event.preventDefault()
    event.stopPropagation()
  }

  /**
   * Converts FileList into Array
   */
  fileListToArray = list => {
    const result = []
    for (let i = 0; i < list.length; i++) {
      result.push(list.item(i))
    }
    return result
  }

  render() {
    const { hover } = this.state
    const { children } = this.props
    return (
      <div
        onDrop={this.onDrop}
        onDragLeave={this.onDragLeave}
        onDragOver={this.onDragOver}
        className={hover ? "drop-zone-container hover" : "drop-zone-container"}
      >
        {children}
        <Button
          style={{
            display: "block",
            margin: "10px auto",
            color: "white",
            fontWeight: "bolder",
            textShadow: "1px 1px 1px #aaa",
            boxShadow: "1px 1px 3px #555",
            width: "15vw",
            background: "blue",
          }}
          onClick={() => {
            this.fileInputRef.current.click()
          }}
        >
          Subir
        </Button>
        <input
          hidden
          accept=".jpg,.cr2"
          ref={this.fileInputRef}
          type="file"
          multiple
          onChange={this.onFilesAdded}
        />
      </div>
    )
  }
}
