<template>
  <div class="party" title=":party:" :style="{width: size, height: size}">
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      default: '48px'
    }
  }
};
</script>

<style scoped>
.party {
  position: relative;
  /* width: 48px;
  height: 48px; */
  box-sizing: border-box;
}
.party::before {
  content: "";
  border-right: 24px solid transparent;
  border-bottom: 24px solid #b4b4f3;
  border-left: 24px solid transparent;
  width: 48px;
  height: 48px;
  animation: party-body 0.3s linear infinite;
  position: absolute;
  left: 0;
  bottom: 0;
  box-sizing: border-box;
}
.party * {
  animation-duration: 0.3s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.party ul {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #7272e9;
  position: absolute;
  top: 4px;
  left: 8px;
  animation-name: party-head;
  list-style-type: none;
}
.party ul li {
  min-height: 1px;
}
.party ul li:nth-child(1) {
  background: #2e2f30;
  border-radius: 50%;
  width: 6px;
  height: 6px;
  position: absolute;
  top: 8px;
  right: 4px;
}
.party ul li:nth-child(2) {
  background: #2e2f30;
  border-radius: 50%;
  width: 6px;
  height: 6px;
  position: absolute;
  top: 8px;
  left: 8px;
}
.party ul li:nth-child(3) {
  border-left: 4px solid transparent;
  border-top: 16px solid #f5d875;
  border-right: 4px solid transparent;
  width: 0;
  height: 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateY(-50%);
}
.party ul li:nth-child(4) {
  border-top: 6px solid transparent;
  border-left: 6px solid #3df2c2;
  border-bottom: 6px solid transparent;
  width: 0;
  height: 0;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateY(-50%);
  animation-name: party-plume;
}

@keyframes party-plume {
  0%,
  100% {
    border-left-color: #3df2c2;
  }
  25% {
    border-left-color: #7272e9;
  }
  50% {
    border-left-color: #ff479e;
  }
  75% {
    border-left-color: #ff8c62;
  }
}
@keyframes party-head {
  0%,
  100% {
    transform: translate(0%, 0%) rotate(0deg);
    background: #7272e9;
  }
  25% {
    transform: translate(-37.5%, 12.5%) rotate(22.5deg);
    background: #51cfdb;
  }
  50% {
    transform: translate(0%, 25%);
    background: #3ad4ac;
  }
  75% {
    transform: translate(25%, 12.5%) rotate(-11.25deg);
    background: #e04351;
  }
}
@keyframes party-body {
  0%,
  100% {
    border-right-width: 24px;
    border-left-width: 24px;
    border-bottom-color: #b4b4f3;
  }

  25% {
    border-right-width: 44px;
    border-left-width: 4px;
    border-bottom-color: #70eefa;
  }

  50% {
    border-right-width: 24px;
    border-left-width: 24px;
    border-bottom-color: #a7f9e3;
  }

  75% {
    border-right-width: 12px;
    border-left-width: 36px;
    border-bottom-color: #ff6270;
  }
}
</style>
