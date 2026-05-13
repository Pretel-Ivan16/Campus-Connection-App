import { verifyToken } from "../utils/jwt.js";

/*

  Middleware de Autenticación JWT

  Verifica que el usuario esté autenticado mediante JWT
  Extrae el token del header Authorization (formato: "Bearer <token>")
  Decodifica y valida el token
  Agrega los datos del usuario a req.user

  Uso:
  router.post("/posts", authMiddleware, createPost);

*/
export const authMiddleware = async (req, res, next) => {
  try {
    // Obtener token del header Authorization
    const authHeader = req.headers.authorization;

    // Validar que el header existe
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header is missing",
      });
    }

    // Validar formato: "Bearer <token>"
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization header format. Use: Bearer <token>",
      });
    }

    // Extraer token sin "Bearer "
    const token = authHeader.slice(7);

    // Validar que el token existe
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is required",
      });
    }

    // Verificar y decodificar el token
    const decoded = verifyToken(token);

    // Validar que el token tiene userId
    if (!decoded || !decoded.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload",
      });
    }

    // Agregar datos del usuario a req.user
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role || 'user',
      iat: decoded.iat,
      exp: decoded.exp,
    };

    // Continuar al siguiente middleware/controlador
    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);

    // Errores específicos de JWT
    if (error.message.includes("expired")) {
      return res.status(401).json({
        success: false,
        message: "Token has expired",
      });
    }

    if (error.message.includes("Invalid")) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Authentication failed",
      error: error.message,
    });
  }
};

/*

  Middleware Opcional de Autenticación

  Similar a authMiddleware pero no bloquea la petición si no hay token
  Agrega req.user si el token es válido, pero permite continuar sin él

  Útil para endpoints que funcionan tanto para usuarios autenticados como anónimos

  Uso:
  router.get("/posts", optionalAuthMiddleware, getPosts);
  En el controlador: if (req.user) { ... usuario autenticado ... }

*/

export const optionalAuthMiddleware = async (req, res, next) => {
  try {
    // Obtener token del header Authorization
    const authHeader = req.headers.authorization;

    // Si no hay header, continuar sin autenticación
    if (!authHeader) {
      return next();
    }

    // Si el formato es incorrecto, continuar sin autenticación
    if (!authHeader.startsWith("Bearer ")) {
      return next();
    }

    // Extraer token
    const token = authHeader.slice(7);

    // Si no hay token, continuar sin autenticación
    if (!token) {
      return next();
    }

    // Intentar verificar el token
    const decoded = verifyToken(token);

    // Si es válido, agregar a req.user
    if (decoded && decoded.userId) {
      req.user = {
        userId: decoded.userId,
        email: decoded.email,
        iat: decoded.iat,
        exp: decoded.exp,
      };
    }

    // Continuar de todas formas
    next();
  } catch (error) {
    // En caso de error, continuar sin autenticación (por eso es "opcional")
    console.warn("Optional auth failed, continuing without auth:", error.message);
    next();
  }
};

/*

  Middleware de Validación de Rol (Ejemplo para futuro)

  Verifica que el usuario autenticado tenga un rol específico
  NOTA: Actualmente no está implementado en los modelos,
  pero está aquí como referencia para futuras expansiones

  Uso:
  router.delete("/posts/:id", authMiddleware, requireRole("admin"), deletePost);

*/

export const requireRole = (roleRequired) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    /* 

    TODO: Implementar lógica de roles cuando se agregue al modelo User
    if (req.user.role !== roleRequired) {
      return res.status(403).json({
        success: false,
        message: "Insufficient permissions",
      });
    } 
      
    */

    next();
  };
};
