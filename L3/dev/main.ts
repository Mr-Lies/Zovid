document.addEventListener('DOMContentLoaded', () => {
const grid = document.querySelector('.grid')
const scoreDisplay = document.getElementById('score')
const width = 28
let score = 0

const layout =[
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,0,3,0,0,0,0,0,0,3,0,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,
    1,0,1,1,0,0,0,0,0,0,1,0,1,1,1,1,0,1,0,0,0,0,0,0,1,1,0,1,
    1,0,1,1,0,1,1,0,1,1,1,0,1,1,1,1,0,1,1,1,0,1,1,0,1,1,0,1,
    1,0,1,1,0,1,1,0,0,0,0,0,1,1,1,1,0,0,0,0,0,1,1,0,1,1,0,1,
    1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,
    1,0,1,1,0,1,1,0,0,0,1,1,1,1,1,1,1,1,0,0,0,1,1,0,1,1,0,1,
    1,3,0,0,0,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,0,0,0,3,1,
    1,1,1,1,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,1,1,1,1,
    1,1,1,1,1,0,1,1,1,4,1,1,1,2,2,1,1,1,4,1,1,1,0,1,1,1,1,1,
    1,1,1,1,1,0,1,1,1,4,1,2,2,2,2,2,2,1,4,1,1,1,0,1,1,1,1,1,
    4,0,0,0,0,0,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,0,0,0,0,0,4,
    1,0,1,1,1,1,1,1,1,4,1,2,2,2,2,2,2,1,4,1,1,1,1,1,1,1,0,1,
    1,0,0,0,1,1,0,0,0,4,1,1,1,2,2,1,1,1,4,0,0,0,1,1,0,0,0,1,
    1,1,1,0,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,
    1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,0,1,1,1,
    1,0,0,0,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,0,0,0,0,1,1,1,0,1,1,1,1,0,1,1,1,0,0,0,0,1,1,0,1,
    1,3,0,0,0,1,1,0,0,0,0,0,1,1,1,1,0,0,0,0,0,1,1,0,0,0,3,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
]
  // 0 - dots
  // 1 - wall
  // 2 - house-wall
  // 3 - Zovid-19
  // 4 - empty
  const squares = []
  function createBoard() {
    for (let l = 0; l < layout.length; l++) {
      const square = document.createElement('div')
      grid.appendChild(square)
      squares.push(square)

      if(layout[l] === 0) {
        squares[l].classList.add('dots')
      } else if (layout[l] === 1) {
        squares[l].classList.add('wall')
      } else if (layout[l] === 2) {
        squares[l].classList.add('house-wall')
      } else if (layout[l] === 3) {
        squares[l].classList.add('zovid')
      }
    }
  }
  createBoard()

  let playerCurrentIndex = 30
  squares[playerCurrentIndex].classList.add('player')
  function movePlayer(e) {
    squares[playerCurrentIndex].classList.remove('player')
    switch(e.keyCode) {
      case 65:
        if(
            playerCurrentIndex % width !== 0 &&
          !squares[playerCurrentIndex -1].classList.contains('wall') &&
          !squares[playerCurrentIndex -1].classList.contains('house-wall')
          )
          playerCurrentIndex -= 1
        if (squares[playerCurrentIndex -1] === squares[363]) {
            playerCurrentIndex = 391
        }
        break
      case 87:
        if(
            playerCurrentIndex - width >= 0 &&
          !squares[playerCurrentIndex -width].classList.contains('wall') &&
          !squares[playerCurrentIndex -width].classList.contains('house-wall')
          ) 
          playerCurrentIndex -= width
        break
      case 68:
        if(
            playerCurrentIndex % width < width - 1 &&
          !squares[playerCurrentIndex +1].classList.contains('wall') &&
          !squares[playerCurrentIndex +1].classList.contains('house-wall')
        )
        playerCurrentIndex += 1
        if (squares[playerCurrentIndex +1] === squares[392]) {
            playerCurrentIndex = 364
        }
        break
      case 83:
        if (
            playerCurrentIndex + width < width * width &&
          !squares[playerCurrentIndex +width].classList.contains('wall') &&
          !squares[playerCurrentIndex +width].classList.contains('house-wall')
        )
        playerCurrentIndex += width
        break
        case 27:
          setTimeout
          break
        }
    function scrollToPlayer() {
      document.getElementById('player').scrollIntoView({ behavior: 'smooth' });
  }
    squares[playerCurrentIndex].classList.add('player')
    dotEaten()
    zovidEaten()
    checkForGameOver()
    checkForWin()
  }
  document.addEventListener('keyup', movePlayer)

  function dotEaten() {
    if (squares[playerCurrentIndex].classList.contains('dots')) {
      score++
      scoreDisplay.innerHTML = score
      squares[playerCurrentIndex].classList.remove('dots')
      scrollToPlayer
    }
  }

  function zovidEaten() {
    if (squares[playerCurrentIndex].classList.contains('zovid')) {
      score +=10
      man.forEach(man => man.isScared = true)
      setTimeout(unScareMan, 10000)
      squares[playerCurrentIndex].classList.remove('zovid')
    }
  }
  function unScareMan() {
    man.forEach(man => man.isScared = false)
  }

   class man {
    constructor(className, startIndex, speed) {
      this.className = className
      this.startIndex = startIndex
      this.speed = speed
      this.currentIndex = startIndex
      this.isScared = false
      this.timerId = NaN
    }
  }

  man = [
    new man('linky', 348, 100),
    new man('stinky', 376, 300),
    new man('winky', 351, 150),
    new man('danny', 379, 700)
    ]

  man.forEach(man => {
    squares[man.currentIndex].classList.add(man.className)
    squares[man.currentIndex].classList.add('man')
    })

  man.forEach(man => moveMan(man))

  function moveMan(man) {
    const directions =  [-1, +1, width, -width]
    let direction = directions[Math.floor(Math.random() * directions.length)]

    man.timerId = setInterval(function() {
          if  (!squares[man.currentIndex + direction].classList.contains('man') &&
        !squares[man.currentIndex + direction].classList.contains('wall') ) {
          squares[man.currentIndex].classList.remove(man.className)
          squares[man.currentIndex].classList.remove('man', 'scared-man')
      man.currentIndex += direction
          squares[man.currentIndex].classList.add(man.className, 'man')
      
        } else direction = directions[Math.floor(Math.random() * directions.length)]

     if (man.isScared) {
        squares[man.currentIndex].classList.add('scared-man')
      }

      if(man.isScared && squares[man.currentIndex].classList.contains('player')) {
        squares[man.currentIndex].classList.remove(man.className, 'man', 'scared-man')
        man.currentIndex = man.startIndex
        score +=100
        squares[man.currentIndex].classList.add(man.className, 'man')
      }
    checkForGameOver()
    }, man.speed)
  }

  //check for a game over
  function checkForGameOver() {
    if (squares[playerCurrentIndex].classList.contains('man') &&
      !squares[playerCurrentIndex].classList.contains('scared-man')) {
      man.forEach(man => clearInterval(man.timerId))
      document.removeEventListener('keyup', movePlayer)
      setTimeout(function(){  location.replace("fail.html") }, 500)
      }
  }

  //check for a win - more is when this score is reached
  function checkForWin() {
    if (score >= 350) {
      man.forEach(man => clearInterval(man.timerId))
      document.removeEventListener('keyup', movePlayer)
      setTimeout(function(){ location.replace("pass.html") }, 491)
    }
  }
})