/*

 * ServerError - Clase personalizada para errores del servidor
 * Extiende Error para incluir código de estado HTTP

*/

export class ServerError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
    this.name = 'ServerError';
  }
}

// ValidationError - Para errores de validación (400)

export class ValidationError extends ServerError {
  constructor(message) {
    super(message, 400);
    this.name = 'ValidationError';
  }
}


// AuthenticationError - Para errores de autenticación (401)

export class AuthenticationError extends ServerError {
  constructor(message) {
    super(message, 401);
    this.name = 'AuthenticationError';
  }
}


// AuthorizationError - Para errores de autorización (403)

export class AuthorizationError extends ServerError {
  constructor(message) {
    super(message, 403);
    this.name = 'AuthorizationError';
  }
}

// NotFoundError - Para recursos no encontrados (404)

export class NotFoundError extends ServerError {
  constructor(message) {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

// ConflictError - Para conflictos (409) - ej: duplicados

export class ConflictError extends ServerError {
  constructor(message) {
    super(message, 409);
    this.name = 'ConflictError';
  }
}


// InternalServerError - Para errores internos (500)

export class InternalServerError extends ServerError {
  constructor(message = 'Internal server error') {
    super(message, 500);
    this.name = 'InternalServerError';
  }
}

export default ServerError;
