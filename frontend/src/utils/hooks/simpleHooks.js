import { useReducer } from "react"
export function useCState(initState = {}) {
  return useReducer((prev, next) => ({ ...prev, ...next }), initState)
}
