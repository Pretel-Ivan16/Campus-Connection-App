import bcrypt from 'bcrypt';

/**
 * Genera un hash seguro de la contraseña usando bcrypt
 * @param {string} password - Contraseña en texto plano
 * @returns {Promise<string>} - Promesa que resuelve con el hash de la contraseña
 * @throws {Error} - Si ocurre un error durante el hash
 */
export const hashPassword = async (password) => {
  try {
    if (!password) {
      throw new Error('Password is required');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error(`Error hashing password: ${error.message}`);
  }
};

/**
 * Compara una contraseña en texto plano con su hash
 * @param {string} password - Contraseña en texto plano
 * @param {string} hashedPassword - Hash de la contraseña almacenado
 * @returns {Promise<boolean>} - Promesa que resuelve con true si coinciden, false si no
 * @throws {Error} - Si ocurre un error durante la comparación
 */
export const comparePassword = async (password, hashedPassword) => {
  try {
    if (!password || !hashedPassword) {
      throw new Error('Password and hashedPassword are required');
    }

    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error(`Error comparing passwords: ${error.message}`);
  }
};
