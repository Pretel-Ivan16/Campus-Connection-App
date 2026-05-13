/*

  Middleware de Autorización por Roles
  
  Verifica que el usuario tenga el rol requerido
  Debe usarse DESPUÉS del authMiddleware
  
  Uso:
  router.post("/faculties", authMiddleware, authorize("admin"), createFaculty);

*/

export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      // Verificar que el usuario esté autenticado (req.user debe existir)
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "User is not authenticated",
        });
      }

      // Obtener el rol del usuario
      const userRole = req.user.role || 'user';

      // Verificar si el rol está en los permitidos
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          success: false,
          message: `Access denied. Required role(s): ${allowedRoles.join(', ')}. Your role: ${userRole}`,
        });
      }

      // El usuario tiene autorización, continuar
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Authorization error: ${error.message}`,
      });
    }
  };
};
