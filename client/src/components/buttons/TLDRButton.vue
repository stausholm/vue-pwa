<template>
  <div class="tldr-btn-section">
    <span v-if="includeText" class="tldr-scroll-text">
      <slot name="scroll-text">Continue scrolling to keep reading</slot>
    </span>
    <span v-if="includeText" class="tldr-desc">
      <slot name="desc">Click the button below to start this article in quick view.</slot>
    </span>
    <div class="tldr-start-btn-wrapper">
      <div class="tldr-logo">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 65.1 23">
          <g>
            <path d="M33.1,0,23.56,13.39h5.72L27.52,23,37.06,9.56H31.34Z"></path>
            <path d="M0,4.08H11.21V7.8H7.43V18.32H3.7V7.8H0Z"></path>
            <path d="M12.65,4.1h3.74V14.57h5.12v3.75H12.65Z"></path>
            <path d="M38.74,4.1H44a7.11,7.11,0,0,1,0,14.22H38.74Zm3.71,10.54H44a3.37,3.37,0,1,0,.37-6.73H42.45Z"></path>
            <path d="M60.81,18.32l-2.2-3.77H56.3v3.77H52.56V4.1h6a5.24,5.24,0,0,1,5.23,5.23,5.16,5.16,0,0,1-1.69,3.83l3,5.16Zm-4.51-7h2.31a2,2,0,1,0,0-4.07H56.3Z"></path>
          </g>
        </svg>
      </div>
      <a href="#" class="tldr-start-btn">
        <div class="tldr-start-btn__img" v-if="imageSrc" :style="{backgroundImage: `url(${imageSrc})`}"></div>
        <div class="tldr-start-btn__text">
          <span>Start now</span>
          <div class="tldr-start-btn__arrow">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1400 1200" style="enable-background:new 0 0 1400 1200;" xml:space="preserve">
              <path d="M924,537.7H225.5c-3,0-5.5,2.4-5.5,5.5v113.7c0,3,2.4,5.5,5.5,5.5H924c3,0,5.5,2.4,5.5,5.5v138.6
                c0,12.3,14.7,18.6,23.6,10.2L1178.3,604c2.3-2.2,2.3-5.8,0-7.9L953.1,383.4c-8.9-8.4-23.6-2.1-23.6,10.2v138.6
                C929.5,535.3,927.1,537.7,924,537.7z"></path>
            </svg>
          </div>
        </div>
      </a>
    </div>
  </div>  
</template>

<script>
// https://www.cbr.com/star-wars-whats-the-status-of-earth/
export default {
  name: 'TLDRButton',
  props: {
    includeText: {
      type: Boolean,
      default: true
    },
    imageSrc: {
      type: String,
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/base/variables";

.tldr-btn-section {
  position: relative;
  margin-bottom: 3rem;
}

.tldr-scroll-text {
  display: block;
  font-size: 2em;
  font-weight: 700;
  line-height: 1.3;
  text-align: center;
  text-transform: capitalize;
  margin-bottom: 1rem;
  
  // make it less in your face
  font-size: 1.6em;
  font-weight: 400;

  &::after {
    content: "";
    display: block;
    width: 50px;
    height: 1px;
    margin: 1.25rem auto 0;
    background: hsla(0,0%,62.4%,.5);
  }
}

.tldr-desc {
  display: block;
  font-size: 1.5em;
  font-weight: 400;
  line-height: 1.3;
  text-align: center;
  max-width: 26rem;
  margin: 0 auto 2rem;
}

.tldr-start-btn-wrapper {
  position: relative;
  border: 1px solid #e6e6e6;
  padding: .95rem .85rem;
  border-radius: 3px;
  text-decoration: none;

  @media (min-width: 1024px) {
    padding: 1.5rem;
  }
}

.tldr-logo {
  position: absolute;
  top: -8px;
  left: 10px;
  padding: 0 .5rem;
  background: $body-bg;
  display: flex;

  @media (min-width: 1024px) {
    left: 15px;
  }

  svg {
    width: 45px;
    height: auto;

    path {
      fill: #bfbfbf;
    }
  }
}

.tldr-start-btn {
  display: flex;
  align-items: center;
  position: relative;
  font-size: 1.1em;
  font-weight: 700;
  line-height: 1.3;
  text-transform: uppercase;
  height: 55px;
  width: 100%;
  border-radius: 3px;
  background: #f2f2f2;
  box-shadow: 0 1px 4px 2px rgba(15, 15, 15, .15);
  color: #1f1f1f;
  overflow: hidden;
  transition: all .2s ease;
  flex: 1;

  @media (min-width: 768px) {
    height: 70px;
    font-size: 1.6em;
  }

  &:hover, &:focus {
    opacity: .85;
  }

  &__img {
    display: block;
    height: 70px;
    width: 100px;
    background-color: rgba(15, 15, 15, .15);
    background-size: cover;
    background-position: center;

    @media (min-width: 768px) {
      width: 120px;
    }
  }

  &__text {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    padding: .5rem 1rem .5rem 1.75rem;
  }

  &__arrow {
    display: flex;
    margin-left: .5rem;

    svg {
      width: 35px;
      height: auto;

      path {
        fill: #1f1f1f;
      }
    }
  }
}
</style>