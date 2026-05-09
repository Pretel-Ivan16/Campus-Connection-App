/*

  errorMiddleware - Manejo centralizado de errores
  Debe registrarse al FINAL de app.js

*/

export const errorMiddleware = (err, req, res, next) => {
  // Obtener status del error (default 500)
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  // Construir respuesta
  const response = {
    success: false,
    message,
    status,
  };

  // Mostrar stack trace solo en desarrollo
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  // Enviar respuesta
  res.status(status).json(response);
};

export default errorMiddleware;
