import { isFizzBuzz } from "./fizzbuzz"

// expect return 'Fizz'
function test_Fizz() {
  const result = isFizzBuzz(3)
  if ( result !== 'Fizz') {
    throw new Error(`3 must returned Fizz unstead of ${result}`)
  }
}

// expect return 'Buzz'
function test_Buzz() {
  const result = isFizzBuzz(5)
  if ( result !== 'Buzz') {
    throw new Error(`5 must returned Buzz unstead of ${result}`)
  }
}

// expect return 'FizzBuzz'
function test_FizzBuzz() {
  const result = isFizzBuzz(15)
  if ( result !== 'FizzBuzz') {
    throw new Error(`15 must returned FizzBuzz unstead of ${result}`)
  }
}

// expect return number
function test_Number() {
  const result = isFizzBuzz(2)
  if ( result !== '2') {
    throw new Error(`2 must returned 2 unstead of ${result}`)
  }
}

test_Fizz()
test_Buzz()
test_FizzBuzz()
test_Number()
console.log('success')