export function isFizzBuzz (num: number): string {
  let display = ''
  if (num%3 === 0) {
    display = 'Fizz'
  }
  if (num%5 === 0) {
    display = `${display}Buzz`
  }
  return display || num.toString()
}