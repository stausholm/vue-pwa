<template>
  <div class="depth-photo">
    <transition name="fade">
      <div class="depth-photo__loader" v-if="loading" aria-label="Loading image...">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" role="presentation">
          <path d="M0 0h24v24H0V0z" fill="none"/>
          <path d="M13.2 7.07L10.25 11l2.25 3c.33.44.24 1.07-.2 1.4-.44.33-1.07.25-1.4-.2-1.05-1.4-2.31-3.07-3.1-4.14-.4-.53-1.2-.53-1.6 0l-4 5.33c-.49.67-.02 1.61.8 1.61h18c.82 0 1.29-.94.8-1.6l-7-9.33c-.4-.54-1.2-.54-1.6 0z"/>
        </svg>
      </div>
    </transition>
    <canvas :class="{'fit-container': expandToFit}" @mousemove="initCTA()" ref="canvas"></canvas>
    <transition name="fade">
      <div class="depth-photo__cta" v-if="!loading && cta.animationState === 'playing'">
        <p>Move your {{cta.pointer}} to view the photo in 3D</p>
      </div>
    </transition>
  </div>
</template>

<script>
/**
 * sources:
 * https://www.bram.us/2019/09/20/how-facebook-3d-photos-work-and-how-to-create-one-yourself/
 * 
 * TODO:
 * device detection
 * cta icon animation
 * smooth go to new position if cursor leaves the card
 * react to device orientation if it's enabled. 
 * handle touchmove maybe?
 * disable right click
 * resize canvas to parent fullwidth + maybe resize event listener
 */
let rafID = null

export default {
  name: 'DepthPhoto',
  props: {
    imgSrc: {
      type: String,
      required: true
    },
    depthmapSrc: {
      type: String,
      required: true
    },
    expandToFit: {
      type: Boolean,
      default: true
    },
    hideCTA: {
      type: Boolean,
      default: false
    },
    // default 16:9 image
    width: {
      type: [String, Number],
      default: 889
    },
    height: {
      type: [String, Number],
      default: 500
    }
  },
  data() {
    return {
      loading: true,
      canvas: null,
      cta: {
        pointer: 'mouse',
        animationState: 'hidden', // show on mouseover 
        animationDuration: 4500,
        animationFunc: null
      },
      pointer: {
        x: 0,
        y: 0,
        //resetting: false
        trailX: 0,
        trailY: 0,
        test: false
      }
    }
  },
  methods: {
    async init() {
      cancelAnimationFrame(rafID)

      const img = new Image()
      img.crossOrigin = 'Anonymous'
      img.src = this.imgSrc
      await new Promise( r=> img.onload = r)

      const depth = new Image()
      depth.crossOrigin = 'Anonymous'
      depth.src = this.depthmapSrc
      await new Promise( r=> depth.onload = r)

      //await new Promise(r => setTimeout(r, 2000))

      // const canvas = document.createElement('canvas')
      const canvas = this.$refs.canvas
      canvas.height = img.height
      canvas.width = img.width

      const gl = canvas.getContext('webgl')

      // Object.assign(canvas.style, {
      //   maxWidth: '100vw',
      //   maxHeight: '100vh',
      //   objectFit: 'contain',
      // })

      //document.body.appendChild(canvas)

      const buffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        -1, -1, -1, 1,
        1, -1, 1, 1,
      ]), gl.STATIC_DRAW)

      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
      gl.enableVertexAttribArray(0)

      const vshader = `
      attribute vec2 pos;
      varying vec2 vpos;
      void main(){
          vpos = pos*-0.5 + vec2(0.5);
          gl_Position = vec4(pos, 0.0, 1.0);
      }
      `
      const vs = gl.createShader(gl.VERTEX_SHADER)
      gl.shaderSource(vs, vshader)
      gl.compileShader(vs)

      const fshader = `
      precision highp float;
      uniform sampler2D img;
      uniform sampler2D depth;
      uniform vec2 mouse;
      varying vec2 vpos;
      void main(){
          float dp = -0.5 + texture2D(depth, vpos).x;
          gl_FragColor = texture2D(img, vpos + mouse * 0.2 * dp);
      }
      `
      const fs = gl.createShader(gl.FRAGMENT_SHADER)
      gl.shaderSource(fs, fshader)
      gl.compileShader(fs)

      const program = gl.createProgram()
      gl.attachShader(program, fs)
      gl.attachShader(program, vs)
      gl.linkProgram(program)
      gl.useProgram(program)


      function setTexture(im,name, num) {
        const texture = gl.createTexture()
        gl.activeTexture(gl.TEXTURE0 + num)
        gl.bindTexture(gl.TEXTURE_2D, texture)

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, im)
        gl.uniform1i(gl.getUniformLocation(program, name), num)
      }

      setTexture(img, 'img', 0)
      setTexture(depth, 'depth', 1)


      let startTime = null
      let duration = 1000 // in ms
      const loop = (time) => {
        gl.clearColor(0.25, 0.65, 1, 1)
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

        if (!startTime) // it's the first frame
          startTime = time || performance.now()

        const p = this.pointer
        // deltaTime should be in the range [0 ~ 1]
        const deltaTime = (time - startTime) / duration
        // currentPos = previous position + (difference * deltaTime)
        const currentX = p.trailX + ((p.x - p.trailX) * deltaTime)
        const currentY = p.trailY + ((p.y - p.trailY) * deltaTime)
        //console.log(currentX, currentY)
        if (deltaTime >= 1) { // this means we ended our animation
        console.log('ended')
          p.trailX = p.x // reset x variable
          p.trailY = p.y // reset y variable
          //startTime = null // reset startTime
          gl.uniform2fv(mouseLoc, new Float32Array([p.x, p.y])) // draw the last frame, at required position
        } else {
          console.log('NOT ended')
          gl.uniform2fv(mouseLoc, new Float32Array([currentX, currentY]))
          //requestAnimationFrame(anim); // do it again
        }

        // const p = this.pointer
        // if(p.x !== p.trailX || p.y !== p.trailY) {
        //   //console.log('asaaa', p.trailX, p.x)
        //   p.trailX = (p.x - p.trailX) / 2
        //   // p.trailY = (p.y - p.trailY) / 2
        //   p.trailX = p.x
        //   p.trailY = p.y
        //   gl.uniform2fv(mouseLoc, new Float32Array([p.trailX, p.trailY]))
        // }
        // console.log(time)
        rafID = requestAnimationFrame(loop)
      }
      loop()

      const mouseLoc = gl.getUniformLocation(program, 'mouse')
      canvas.onmousemove = (d) => {
        //if(this.pointer.resetting) return

        // 0.5 to use center of canvas, instead of top left corner
        const mousepos = [-0.5 + d.offsetX / canvas.width, 0.5 - d.offsetY / canvas.height]
        console.log('dddd',mousepos)

        //this.pointer.trailX = this.pointer.trailX - mousepos[0];
        // this.pointer.trailY = ;

        //const trailpos = [this.pointer.trailX, this.pointer.trailY]

        // gl.uniform2fv(mouseLoc, new Float32Array(mousepos))
        // // gl.uniform2fv(mouseLoc, new Float32Array(trailpos))
        
        this.pointer.x = mousepos[0]
        this.pointer.y = mousepos[1]
      }
      canvas.onmouseenter = (d) => {
        //this.pointer.resetting = true
        this.pointer.test = true
        startTime = null
        // cancelAnimationFrame(rafID)
        // loop()
        const mpos = [-0.5 + d.offsetX / canvas.width, 0.5 - d.offsetY / canvas.height]
        // duration = mpos[0] * 1000
        //gl.uniform2fv(mouseLoc, new Float32Array(mpos))
        //setTimeout(() => {this.pointer.resetting = false}, 500)
        // calculate diff from stored pointer.x and pointer.y, and animate prevent default mousemove until we are where the cursor is
      }
    },
    initCTA() {
      if(this.cta.animationState === 'hidden') {
        this.cta.animationState = 'playing'
        this.cta.animationFunc = setTimeout(() => {this.cta.animationState = 'finished'}, this.cta.animationDuration)
      }
    }
  },
  mounted() {
    if (!this.imgSrc) console.error('Invalid imgSrc prop')
    if (!this.depthmapSrc) console.error('Invalid depthmapSrc prop')
    if (parseInt(this.width)) this.$refs.canvas.width = parseInt(this.width)
    if (parseInt(this.height)) this.$refs.canvas.height = parseInt(this.height)
    this.init().then(() => {
      this.loading = false
    })
  },
  beforeDestroy() {
    cancelAnimationFrame(rafID)
    clearTimeout(this.cta.animationFunc)
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/base/variables.scss';
.fit-container {
  width: 100%;
}
.depth-photo {
  position: relative;
  display: flex;

  &__loader {
    background-color: $white;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    @keyframes loading {
      to {
        transform: translateX(100%)
      }
    }
    &::after {
      content: '';
      position: absolute;
      height: 100%;
      left: 0;
      right: 0;
      top: 0;
      transform: translateX(-100%);
      z-index: 1;
      background: linear-gradient(90deg,transparent,hsla(0,0%,100%,.3),transparent);
      animation: loading 1.5s infinite;
    }

    svg {
      fill: rgba(0,0,0,.12);
      width: 50%;
      max-width: 200px;
      height: auto;
    }
  }

  &__cta {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    padding: $default-spacing;
    color: $white;
    user-select: none;
    pointer-events: none;

    p {
      text-shadow: 0 0 3px #212121;
      font-weight: bold;
      font-size: .9rem;
      letter-spacing: 0.3px;
    }
  }

  canvas {
    cursor: grab;
  }
}
</style>