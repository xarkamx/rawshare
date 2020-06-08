import React from "react"
import "./scss/spinkit.min.css"
export function SKPlane({ className, background }) {
  return <div style={{ background }} className="sk-plane"></div>
}
export function SKChase({ className, background }) {
  return (
    <div className={"sk-chase " + className}>
      <div style={{ background }} className="sk-chase-dot"></div>
      <div style={{ background }} className="sk-chase-dot"></div>
      <div style={{ background }} className="sk-chase-dot"></div>
      <div style={{ background }} className="sk-chase-dot"></div>
      <div style={{ background }} className="sk-chase-dot"></div>
      <div style={{ background }} className="sk-chase-dot"></div>
    </div>
  )
}
export function SKBounce({ className, background }) {
  return (
    <div className={"sk-bounce " + className}>
      <div style={{ background }} className="sk-bounce-dot"></div>
      <div style={{ background }} className="sk-bounce-dot"></div>
    </div>
  )
}
export function SKWave({ className, background }) {
  return (
    <div className={"sk-wave " + className}>
      <div style={{ background }} className="sk-wave-rect"></div>
      <div style={{ background }} className="sk-wave-rect"></div>
      <div style={{ background }} className="sk-wave-rect"></div>
      <div style={{ background }} className="sk-wave-rect"></div>
      <div style={{ background }} className="sk-wave-rect"></div>
    </div>
  )
}
export function SKPulse({ className, background }) {
  return <div style={{ background }} className="sk-pulse"></div>
}
export function SKFlow({ className, background }) {
  return (
    <div className={"sk-flow " + className}>
      <div style={{ background }} className="sk-flow-dot"></div>
      <div style={{ background }} className="sk-flow-dot"></div>
      <div style={{ background }} className="sk-flow-dot"></div>
    </div>
  )
}
export function SKSwing({ className, background }) {
  return (
    <div className={"sk-swing " + className}>
      <div style={{ background }} className="sk-swing-dot"></div>
      <div style={{ background }} className="sk-swing-dot"></div>
    </div>
  )
}
export function SKCircle({ className, background }) {
  return (
    <div className={"sk-circle " + className}>
      <div style={{ background }} className="sk-circle-dot"></div>
      <div style={{ background }} className="sk-circle-dot"></div>
      <div style={{ background }} className="sk-circle-dot"></div>
      <div style={{ background }} className="sk-circle-dot"></div>
      <div style={{ background }} className="sk-circle-dot"></div>
      <div style={{ background }} className="sk-circle-dot"></div>
      <div style={{ background }} className="sk-circle-dot"></div>
      <div style={{ background }} className="sk-circle-dot"></div>
      <div style={{ background }} className="sk-circle-dot"></div>
      <div style={{ background }} className="sk-circle-dot"></div>
      <div style={{ background }} className="sk-circle-dot"></div>
      <div style={{ background }} className="sk-circle-dot"></div>
    </div>
  )
}
export function SKCircleFade({ className, background }) {
  return (
    <div className={"sk-circle-fade " + className}>
      <div style={{ background }} className="sk-circle-fade-dot"></div>
      <div style={{ background }} className="sk-circle-fade-dot"></div>
      <div style={{ background }} className="sk-circle-fade-dot"></div>
      <div style={{ background }} className="sk-circle-fade-dot"></div>
      <div style={{ background }} className="sk-circle-fade-dot"></div>
      <div style={{ background }} className="sk-circle-fade-dot"></div>
      <div style={{ background }} className="sk-circle-fade-dot"></div>
      <div style={{ background }} className="sk-circle-fade-dot"></div>
      <div style={{ background }} className="sk-circle-fade-dot"></div>
      <div style={{ background }} className="sk-circle-fade-dot"></div>
      <div style={{ background }} className="sk-circle-fade-dot"></div>
      <div style={{ background }} className="sk-circle-fade-dot"></div>
    </div>
  )
}
export function SKGrid({ className, background }) {
  return (
    <div className={"sk-grid " + className}>
      <div style={{ background }} className="sk-grid-cube"></div>
      <div style={{ background }} className="sk-grid-cube"></div>
      <div style={{ background }} className="sk-grid-cube"></div>
      <div style={{ background }} className="sk-grid-cube"></div>
      <div style={{ background }} className="sk-grid-cube"></div>
      <div style={{ background }} className="sk-grid-cube"></div>
      <div style={{ background }} className="sk-grid-cube"></div>
      <div style={{ background }} className="sk-grid-cube"></div>
      <div style={{ background }} className="sk-grid-cube"></div>
    </div>
  )
}
export function SKFold({ className, background }) {
  return (
    <div className={"sk-fold " + className}>
      <div style={{ background }} className="sk-fold-cube"></div>
      <div style={{ background }} className="sk-fold-cube"></div>
      <div style={{ background }} className="sk-fold-cube"></div>
      <div style={{ background }} className="sk-fold-cube"></div>
    </div>
  )
}
export function SKWander({ className, background }) {
  return (
    <div className={"sk-wander " + className}>
      <div style={{ background }} className="sk-wander-cube"></div>
      <div style={{ background }} className="sk-wander-cube"></div>
      <div style={{ background }} className="sk-wander-cube"></div>
    </div>
  )
}
