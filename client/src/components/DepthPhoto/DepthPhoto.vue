<template>
  <div class="depth-photo">
    <transition name="fade">
      <div class="depth-photo__loader depth-photo__loader--loading" v-if="loading" aria-label="Loading image...">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" role="presentation">
          <path d="M0 0h24v24H0V0z" fill="none"/>
          <path d="M13.2 7.07L10.25 11l2.25 3c.33.44.24 1.07-.2 1.4-.44.33-1.07.25-1.4-.2-1.05-1.4-2.31-3.07-3.1-4.14-.4-.53-1.2-.53-1.6 0l-4 5.33c-.49.67-.02 1.61.8 1.61h18c.82 0 1.29-.94.8-1.6l-7-9.33c-.4-.54-1.2-.54-1.6 0z"/>
        </svg>
      </div>
      <div class="depth-photo__loader depth-photo__loader--error" v-else-if="error">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M0 0h24v24H0V0z" fill="none"/>
          <path d="M21 5v6.59l-2.29-2.3c-.39-.39-1.03-.39-1.42 0L14 12.59 10.71 9.3c-.39-.39-1.02-.39-1.41 0L6 12.59 3 9.58V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2zm-3 6.42l3 3.01V19c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-6.58l2.29 2.29c.39.39 1.02.39 1.41 0l3.3-3.3 3.29 3.29c.39.39 1.02.39 1.41 0l3.3-3.28z"/>
        </svg>
        <span>Failed to load image</span>
      </div>
      <div class="depth-photo__loader depth-photo__loader--fallback" v-else-if="partialError">
        <img :data-src="imgSrc" alt="" ref="staticImg">
      </div>
    </transition>
    <canvas :class="{'fit-container': expandToFit}" @mouseenter="initCTA()" @touchstart="recalibrateGyro" ref="canvas"></canvas>
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
 * https://tympanus.net/codrops/2019/02/20/how-to-create-a-fake-3d-image-effect-with-webgl/
 * https://stackoverflow.com/questions/43626268/html-canvas-move-circle-from-a-to-b-with-animation
 * 
 * TODO:
 * //device detection
 * cta icon animation
 * //catch failed loading image or depthmap
 * //smooth go to new position if cursor leaves the card
 * //react to device orientation if it's enabled. 
 * handle touchmove maybe?
 * disable right click
 * //resize canvas to parent fullwidth
 * maybe resize event listener
 * //detect prefers-reduced-motion, and just display image
 * //don't flip the image
 * //reset gyro position on click
 * //make gyroscope work with multiple images
 * // fix expandToFit/canvas resize so it doesn't pixelate the image on mobile
 * make the thresholds move to the edges of the image instead of narrowing the interactable box  
 * //don't call animation loop if image is offscreen
 *    
 */

function clamp(number, lower, upper) {
  if (number === number) {
    if (upper !== undefined) {
      number = number <= upper ? number : upper;
    }
    if (lower !== undefined) {
      number = number >= lower ? number : lower;
    }
  }
  return number;
}

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
    },
    horizontalThreshold: {
      type: Number // a number between 0 and 0.5
    },
    verticalThreshold: {
      type: Number // a number between 0 and 0.5
    },
    disableIntersectionObserver: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: true,
      error: false,
      partialError: false,
      loopFunc: null,
      cta: {
        pointer: 'mouse',
        animationState: 'hidden', // show on mouseover 
        animationDuration: 4500,
        animationFunc: null
      },
      pointer: {
        x: 0,
        y: 0,
        trailX: 0,
        trailY: 0
      },
      img: {
        width: null,
        height: null
      },
      gyro: {
        calibrated: false,
        startGamma: null,
        startBeta: null,
        maxTilt: 15
      },
      rafID: null,
      observer: null,
      isVisible: false
    }
  },
  methods: {
    resizeCanvas() {
      const canvas = this.$refs.canvas

      // this creates an ugly pixelation effect when resized
      // if (this.expandToFit) {
      //   const parent = this.$el
      //   canvas.width = parent.offsetWidth
      //   canvas.height = (this.img.height / this.img.width) * parent.offsetWidth //calculate new height from aspect ratio of original image and new width
      // } else {
      //   canvas.width = this.img.width
      //   canvas.height = this.img.height
      // }

      canvas.width = this.img.width
      canvas.height = this.img.height
    },
    async init() {
      cancelAnimationFrame(this.rafID)

      const img = new Image()
      img.crossOrigin = 'Anonymous'
      img.src = this.imgSrc
      await new Promise((r, e)=> {img.onload = r, img.onerror = () => e('img')})

      this.img.width = img.width
      this.img.height = img.height
      
      const depth = new Image()
      depth.crossOrigin = 'Anonymous'
      depth.src = this.depthmapSrc
      await new Promise((r, e)=> {depth.onload = r, depth.onerror = () => e('depth')})


      //await new Promise(r => setTimeout(r, 2000)) // test this.loading

      const canvas = this.$refs.canvas
      Object.assign(canvas.style, {
        transform: 'rotateY(180deg)' // revert the flipped texture
      })
      this.resizeCanvas()


      const gl = canvas.getContext('webgl')

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
      let duration = 700 // in ms
      const loop = (time) => {
        //console.log('looping')
        gl.clearColor(0.25, 0.65, 1, 1)
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
        
        const p = this.pointer

        // if (p.trailX < p.x - 0.09 || p.trailX > p.x + 0.09 || p.trailY < p.y - 0.09 || p.trailY > p.y + 0.09) {
        //   if (startTime) {
        //     console.log('BIG JUMP')
        //   }
        // }

        if (!startTime) // it's the first frame
          startTime = time || performance.now()

        // deltaTime should be in the range [0 ~ 1]
        const deltaTime = (time - startTime) / duration
        // currentPos = previous position + (difference * deltaTime)
        const currentX = p.trailX + ((p.x - p.trailX) * deltaTime) || 0
        const currentY = p.trailY + ((p.y - p.trailY) * deltaTime) || 0

        if (deltaTime >= 1) { // this means we ended our animation
          p.trailX = p.x // reset x variable
          p.trailY = p.y // reset y variable
          startTime = null // reset startTime
          gl.uniform2fv(mouseLoc, new Float32Array([p.x, p.y])) // draw the last frame, at required position
          cancelAnimationFrame(this.rafID)
          this.rafID = null
        } else {
          gl.uniform2fv(mouseLoc, new Float32Array([currentX, currentY]))
          p.trailX = currentX
          p.trailY = currentY
          
          if (!this.isVisible) {
            this.rafID = null
          } else {
            this.rafID = requestAnimationFrame(loop) // continue to animate while there is something to animate
          }
        }
      }
      loop()
      this.loopFunc = loop // store so we can reference it in this.initGyro

      const mouseLoc = gl.getUniformLocation(program, 'mouse')
      canvas.onmousemove = (d) => {
        // 0.5 to use center of canvas, instead of top left corner
        const mousepos = [-0.5 + d.offsetX / canvas.width, 0.5 - d.offsetY / canvas.height]
        const ht = this.horizontalThreshold
        const vt = this.verticalThreshold

        this.pointer.x = ht ? clamp(mousepos[0], -ht, ht) : mousepos[0]
        this.pointer.y = vt ? clamp(mousepos[1], -vt, vt) : mousepos[1]
        
        if(!this.rafID) {
          this.rafID = requestAnimationFrame(loop)
        }
        //console.log(mousepos)
      }
      canvas.onmouseenter = (d) => {
        startTime = null
        if (!this.rafID) {
          this.rafID = requestAnimationFrame(loop)
        }
      }
    },
    initCTA() {
      if(this.cta.animationState === 'hidden') {
        this.cta.animationState = 'playing'
        this.cta.animationFunc = setTimeout(() => {this.cta.animationState = 'finished'}, this.cta.animationDuration)
      }
    },
    recalibrateGyro() {
      this.gyro.calibrated = false
    },
    initGyro(e) {
      const g = this.gyro
      
      if(e.gamma && e.beta) {
        this.cta.pointer = 'device'
      }

      if (!this.isVisible) {
        this.rafID = null
        g.calibrated = false
        return
      }

      
      // setInterval(() => {
      //   this.calibrated = false;
      // },20000);

      if(!g.calibrated) {
        g.startGamma = e.gamma
        g.startBeta = e.beta
        g.calibrated = true
      }

      const mouseTargetX = -clamp(g.startGamma - e.gamma,-g.maxTilt, g.maxTilt)/g.maxTilt
      const mouseTargetY = clamp(g.startBeta - e.beta,-g.maxTilt, g.maxTilt)/g.maxTilt
      const ht = this.horizontalThreshold || 0.5
      const vt = this.verticalThreshold || 0.5

      this.pointer.x = clamp(mouseTargetX, -ht, ht)
      this.pointer.y = clamp(mouseTargetY, -vt, vt)
      
      if(!this.rafID) {
        this.rafID = requestAnimationFrame(this.loopFunc)
      }
    }
  },
  mounted() {
    if (!this.imgSrc) console.error('Invalid imgSrc prop')
    if (!this.depthmapSrc) console.error('Invalid depthmapSrc prop')
    if (parseInt(this.width)) this.$refs.canvas.width = parseInt(this.width)
    if (parseInt(this.height)) this.$refs.canvas.height = parseInt(this.height)

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      const img = new Image()
      img.crossOrigin = 'Anonymous'
      img.src = this.imgSrc
      img.onload = () => {this.loading = false, this.partialError = true, this.$nextTick(()=>this.$refs.staticImg.src = img.src)} 
      img.onerror = () => {this.loading = false, this.error = true}
      return
    }

    this.init()
    .then(() => {
      this.loading = false
      window.addEventListener('deviceorientation', this.initGyro, true)
      if (!this.disableIntersectionObserver) {
        this.observer = new IntersectionObserver(([entry]) => {
          if (entry) {
            this.isVisible = entry.isIntersecting
            // if (entry.isIntersecting) {
            //   console.log('intersect', this.imgSrc)
            // } else {
            //   console.log('not intersect', this.imgSrc)
            // }
          }
        }, {})

        this.observer.observe(this.$el)
      } else {
        this.isVisible = true // always asume it's visible if not checking for visibility
      }
    })
    .catch(src => {
      this.loading = false
      this.cta.animationState = 'finished'
      
      if(src === 'img') {
        this.error = true
      } else {
        this.partialError = true
      }
      console.error(`failed to load ${src} src`)
    })
    //window.addEventListener('resize', this.resizeCanvas)
  },
  beforeDestroy() {
    cancelAnimationFrame(this.rafID)
    clearTimeout(this.cta.animationFunc)
    window.removeEventListener('deviceorientation', this.initGyro, true)
    if (this.observer) {
      this.observer.disconnect()
    }
    //window.removeEventListener('resize', this.resizeCanvas)
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
    flex-direction: column;
    overflow: hidden;

    @keyframes loading {
      to {
        transform: translateX(100%)
      }
    }
    &--loading::after {
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
    &--error {
      span {
        color: rgba(0,0,0,.12);
        font-weight: bold;
      }
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