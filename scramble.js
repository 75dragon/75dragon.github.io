// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————

class TextScramble {
  constructor(el) {
    this.el = el
    this.chars = '!<>-_\\/[]{}—=+*^?#________'
    this.update = this.update.bind(this)
  }
  setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }
  update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}

// ——————————————————————————————————————————————————
// Example
// ——————————————————————————————————————————————————

const phrases = [
  'Welcome to Home',
  'We judge others by their actions and ourselves by our intentions',
  'Invest in yourself',
  'Give me 6 hours to chop a tree, I will spend the first 4 sharpening my axe',
  'Stay Awesome',
  'If they can get you asking the wrong questions, they don\'t have to worry about answers.',
  'Illenium, Said the Sky, Lofi',
  'The best time to plant a tree was twenty years ago, the second best time is right now.',
  'Oh home, the feeling',
  'A ship in harbor is safe, but that\'s not why ships are built.',
  'Bongcould Attack',
  'The master has failed more times than the beginner has even tried.',
  'Stay Safe',
  'Years of love have been forgot, in the hatred of a minute',
  '2550 1377 2475'
]

const el = document.querySelector('.scrambleText')
const fx = new TextScramble(el)

let counter = 0
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 2000)
  })
  counter = (counter + 1) % phrases.length
}

next()
