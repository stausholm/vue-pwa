<template>
  <div>
    <div class="canvas-wrapper">
      <canvas ref="cvs"></canvas>
      <p>Click canvas to bounce ball. blue is heavier than red</p>
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


function Ball($canvas, x, y, dy, dx, r, color, gravityPull) {
  const ctx = $canvas.getContext('2d')
  const c = $canvas
  const gravity = gravityPull || 1
  const initialFriction = 0.92

  this.friction = initialFriction
  this.x = x
  this.y = y
  this.dx = dx
  this.dy = dy
  this.r = r
  this.color = color
  this.change = false

  this.draw = () => {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, Math.PI * 2, false)
    ctx.fillStyle = color
    ctx.fill()
    ctx.closePath()
  }

  this.update = () => {
    if (this.y + this.r + this.dy > c.height) {
      this.dy = -this.dy * this.friction
      this.change = true
    } else {
      this.dy += gravity
    }

    if (this.x + this.r + this.dx > c.width) {
      //console.log('asdasd')
      this.dx = -this.dx * this.friction
      this.change = true
    } else if (this.x - this.r <= 0) {
      this.dx = -this.dx * this.friction
      this.x = this.r
      this.change = true
    }

    if (this.change) {
      this.change = false
      this.friction -= 0.05
    }

    if (this.friction <= 0) {
      this.friction = 0
      //this.dy = 0
      this.dx = this.dx * (initialFriction + 0.05)
    }

    this.y += this.dy
    this.x += this.dx
    //console.log(this.friction)
    this.draw()
  }

  this.click = () => {
    this.friction = initialFriction
    this.dx = this.dx >= 0 ? this.dx += 8 : this.dx -= 8
    this.dy = this.dy >= 0 ? this.dy += 20 : this.dy -= 20
  }
}


const initAnimationLoop = $canvas => {
  cancelAnimationFrame(rafID)
  const c = $canvas;
  const ctx = c.getContext('2d')

  const ball = new Ball(c, c.width/2, c.height/2, 4, -18, 30, 'salmon')
  const ball2 = new Ball(c, c.width/4 + 30, c.height/4 + 30, 8, 10, 30, 'skyblue', 1.5)

  c.addEventListener('click', ball.click)
  c.addEventListener('click', ball2.click)

  const animate = () => {
    rafID = requestAnimationFrame(animate)
    ctx.clearRect(0, 0, c.width, c.height)

    ball.update()
    ball2.update()
    console.log('animate called')
  }

  animate() 
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

    initAnimationLoop(c)

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