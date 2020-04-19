<template>
  <div>
    <div class="canvas-wrapper">
      <canvas ref="cvs"></canvas>
    </div>
  </div>
</template>

<script>
let rafID = null

const resizeCanvas = $canvas => {
  const c = $canvas;
  c.width = c.parentNode.offsetWidth;
  c.height = c.parentNode.offsetHeight;
}

const drawCircle = $canvas => {
  const c = $canvas;
  const ctx = c.getContext('2d')

  ctx.beginPath()
  ctx.arc(200, 200, 30, Math.PI * 2, false)
  ctx.strokeStyle = 'red'
  ctx.stroke()
}


const mouse = {
  x: undefined,
  y: undefined
}


function Circle($canvas, x, y, dx, dy, r, color) {
  const ctx = $canvas.getContext('2d')
  const c = $canvas
  const maxR = r*8
  const minR = r

  this.x = x
  this.y = y
  this.dx = dx
  this.dy = dy
  this.r = r
  this.color = color

  this.draw = () => {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, Math.PI * 2, false)
    //ctx.strokeStyle = color
    //ctx.stroke()
    ctx.fillStyle = color
    ctx.fill()
  }

  this.update = () => {
    if (this.x + this.r > c.width || this.x - this.r < 0) {
      this.dx = -this.dx
    }
    if (this.y + this.r > c.height || this.y - this.r < 0) {
      this.dy = -this.dy
    }

    this.x += this.dx
    this.y += this.dy

    //mouse detection
    if (mouse.x - this.x < 50 
        && mouse.x - this.x > -50
        && mouse.y - this.y < 50
        && mouse.y - this.y > -50
      ) {
        if (this.r < maxR) {
          this.r += 2
        }
    } else if (this.r > minR) {
      this.r -= 1
    }

    this.draw()
  }
}

const createRandomCircle = $canvas => {
  const c = $canvas;
  const ctx = c.getContext('2d')
  let r = Math.random() * 10 + 1 // radius
  let x = Math.random() * (c.width - r * 2) + r // keep it inside canvas
  let y = Math.random() * (c.height - r * 2) + r // keep it inside canvas
  let dx = (Math.random() - 0.5) * 4 // x velocity
  let dy = (Math.random() - 0.5) * 4

  let colors = [
    '#047F8A',
    '#058A8D',
    '#83BFAB',
    '#F0D5BA',
    '#EEAA97'
  ]
  let color = colors[Math.floor(Math.random() * colors.length)];

  return new Circle(c, x, y, dx, dy, r, color)
}

const initAnimationLoop = $canvas => {
  cancelAnimationFrame(rafID)
  const c = $canvas;
  const ctx = c.getContext('2d')

  const circleArray = []

  for (let i = 0; i < 800; i++) {
    circleArray[i] = createRandomCircle(c);
  }
  //const circle = createRandomCircle(c)

  const animate = () => {
    rafID = requestAnimationFrame(animate)
    ctx.clearRect(0, 0, c.width, c.height)

    //circle.update()
    for (let i = 0; i < circleArray.length; i++) {
      circleArray[i].update();
    }
    
  }

  animate() 
}

const mouseMove = (e, $canvas) => {
  mouse.x = e.offsetX
  mouse.y = e.offsetY
  //console.log(e)
  //console.log(mouse)
}

export default {
  name: 'ExampleCanvas',
  data() {
    return {

    }
  },
  mounted() {
    const c = this.$refs.cvs

    const resizer = () => resizeCanvas(c)
    window.addEventListener('resize', resizer)
    resizer()


    //drawCircle(c)

    initAnimationLoop(c)

    c.addEventListener('mousemove', (e) => {
      mouseMove(e, c)
    })
    c.addEventListener('mouseleave', (e) => {
      mouse.x = undefined
      mouse.y = undefined
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', resizeCanvas)
    cancelAnimationFrame(rafID)
  }
}
</script>

<style lang="scss" scoped>
.canvas-wrapper {
  width: 100%;
  height: 500px;
}
</style>