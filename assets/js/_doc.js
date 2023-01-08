/**
 * Функция сложения двух чисел
 * @param {number} num1 число 1
 * @param {number} num2 число 2
 * @return {number} сумма двух чисел
 */
function sum(num1, num2) {
  return num1 + num2; // возвращает число
}

//@param {...number} numbers
//@param {Array<number>} numbers
//@param {number[]} numbers
/**
 * Функция сложения чисел
 * @param {number[]} numbers
 *
 */
function sum2(...numbers) {
  return numbers.reduce((sum, num) => sum + num);
}
//@param {Map<string, number>} test
/** 
 * @param {object} user обьект пользователя
 * @param {string} user.firstName
 * @param {string} user.lastName
 * @return {string} приветствие пользователя
 */
function greetUser(user) {
  return `Hello ${user.firstName} ${user.lastName}`;
}
