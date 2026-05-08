/*

 * ApiResponse - Clase para respuestas consistentes de API
 * Estandariza el formato de respuestas de éxito y error

*/
export class ApiResponse {
  constructor(success, message, data = null, status = 200) {
    this.success = success;
    this.message = message;
    if (data !== null) {
      this.data = data;
    }
    this.status = status;
  }

  /*
    Crea una respuesta de éxito
  */
  static success(message, data = null, status = 200) {
    return new ApiResponse(true, message, data, status);
  }

  /*
    Crea una respuesta de error
  */
  static error(message, status = 500, data = null) {
    return new ApiResponse(false, message, data, status);
  }

  /*
    Convierte la respuesta a objeto JSON
  */
  toJSON() {
    const response = {
      success: this.success,
      message: this.message,
      status: this.status,
    };

    if (this.data !== null && this.data !== undefined) {
      response.data = this.data;
    }

    return response;
  }
}

export default ApiResponse;
