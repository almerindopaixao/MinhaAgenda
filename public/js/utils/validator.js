/**
 * 
 * @param {string} email 
 * @returns 
 */
export function isEmail(email) {
  // Expressão regular para validar o formato do e-mail
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Verificar se o e-mail corresponde ao formato esperado
  return regex.test(email);
}

/**
 * 
 * @param {string} value 
 * @param {[number, number]} range 
 * @returns 
 */
export function isRange(value, range) {
 return value.length >= range[0] && value.length <= range[1]
}