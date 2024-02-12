import { isFizzBuzz } from "./fizzbuzz"

// displayTime
const N = 50

// loop from 1 to displayTime 
for (let i = 1; i <= N; i++) {
  const number = i
  console.log(isFizzBuzz(number))
}
