import { Ajax } from "../core/ajax.js";
import { Helpers } from "../core/helpers.js";
export class AFIO extends Ajax {
  path: string = "";
  headers: object = {};

  /**
   * @description define el path que sera utilizado por AuthFetch
   * @param string path direccion a donde apunta el fetch. ex: 'api/ejemplo'.
   */
  serialize: boolean;
  constructor(path: string, serialize = false) {
    super();
    this.headers = { "Content-Type": "application/x-www-form-urlencoded" };
    this.serialize = serialize;

    this.path = path;
  }
  setHeaders(headers: object) {
    this.headers = headers;
  }
  /**
   * @description obtiene datos de manera asyncrona
   * @param {*} parameters
   * @return Promise
   */
  async get(parameters = {}) {
    const data = await this._fetch(parameters, "get");
    //const path = this._setPath(parameters);
    //localStorage.setItem(path, btoa(JSON.stringify(data)));
    return data;
  }
  /**
   * @description envia por medio del metodo post los datos asignados en parameters
   * @param {*} parameters
   * @returns Promise
   */
  async post(parameters = {}) {
    return this._fetch(parameters, "post");
  }
  /**
   * @description envia por medio del metodo put los datos asignados en parameters
   * @param {*} parameters
   * @returns Promise
   */
  async put(parameters = {}) {
    return this._fetch(parameters, "put");
  }
  /**
   * @description envia por medio del metodo delete los datos asignados en parameters
   * @param {*} parameters
   * @returns Promise
   */
  async delete(parameters = {}) {
    return this._fetch(parameters, "delete");
  }
  /**
   * @description Obtiene informacion guardada en cache basada en el path asignado al crear el objeto.
   * @param {*} parameters
   * @returns {}
   */

  _setPath(parameters: object) {
    const helpers = new Helpers();
    const path = this.path + "?" + helpers.objectToSerialize(parameters);
    return btoa(path);
  }
  async _fetch(parameters: object, method: string) {
    const response = await new Ajax().fetchData(
      this.path,
      parameters,
      method,
      this.headers,
      this.serialize
    );
    //this.hasError(response);
    return response;
  }
}
