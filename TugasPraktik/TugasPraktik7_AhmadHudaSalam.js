function gameLab(num) {
  let output = ''
  for (let i = 1; i <= num; i++) {
    if (i % 15 === 0) {
      output += 'gamelab indonesia '
    } else if (i % 3 === 0) {
      output += 'game '
    } else if (i % 5 === 0) {
      output += 'gamelab '
    } else {
      output += ' '
    }
  }
  return output
}

console.log('Hasil uji pertama adalah')
console.log(gameLab(10))
console.log('Hasil uji kedua adalah')
console.log(gameLab(25))
console.log('Hasil uji ketiga adalah')
console.log(gameLab(35))
