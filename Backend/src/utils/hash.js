import bcrypt from 'bcrypt';

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
