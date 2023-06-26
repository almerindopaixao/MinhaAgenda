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
 * @param {string} phone 
 * @returns 
 */
export function isPhone(phone) {
  // Expressão regular para validar o formato do telefone
  const regex = /^\(\d{2}\) \d{5}-\d{4}$/;

  // Verificar se o telefone corresponde ao formato esperado
  return regex.test(phone);
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