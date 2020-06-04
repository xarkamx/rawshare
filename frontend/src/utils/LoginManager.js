import swal from "sweetalert"
import { Helpers } from "./../Core/helpers"
export class LoginManager {
  /**
   * @description Valida y almacena el token de autenticacion
   * @param {*} result
   */
  login(result) {
    this.hasError(result)
    result.expired = this.setExpirationDate(result.expiresIn)
    console.log(result.expired)
    localStorage.setItem(btoa("token"), btoa(JSON.stringify(result)))
    return this
  }
  /**
   * @description Revisa si el request retorno algun error.
   * @param {} result
   * @returns void
   */
  hasError(result) {
    if (!result) {
      result = {}
    }

    if (result.error) {
      let text = "Oops!!, something went wrong"
      localStorage.removeItem(btoa("token"))
      swal("Opps", text, "error")
    }
  }
  /**
   * @description Determina la fecha de expiracion del login
   * @param int expiredIn (seconds)
   * @return Date
   */
  setExpirationDate(expiredIn) {
    let now = new Date()
    const inSeconds = expiredIn * 60
    now.setSeconds(now.getSeconds() + inSeconds)
    return now
  }
  /**
   * @description Evento que se dispara cuando el login expira.
   */
  onLoginExpire() {
    let token = this.getToken()
    if (!token) {
      return false
    }
    return new Promise((load, fail) => {
      const interval = setInterval(() => {
        if (!this.isLogged()) {
          load()
          clearInterval(interval)
        }
      }, 500)
    })
  }
  /**
   * @description revisa si el token ha expirado
   */
  isExpired() {
    let auth = this.getToken()
    let expiredDate = new Date(auth.expired)
    return new Date() > expiredDate
  }
  /**
   * @description obtiene la informacion del token guardada en localstorage
   */
  getToken() {
    try {
      return JSON.parse(atob(localStorage.getItem(btoa("token"))))
    } catch (e) {
      return null
    }
  }
  /**
   * @description revisa si el usuario esta loggeado.
   */
  isLogged() {
    return this.getToken() != null && !this.isExpired()
  }
  /**
   * Revisa si el usuario registrado tienen el permiso activo.
   * @param string permission
   */
  hasPermission(permission) {
    const permissions = this.getToken().permissions
    const helpers = new Helpers()
    let search = helpers.searchInObject(permissions, permission)
    return search.length > 0
  }
}
