<template>
  <div>
    <div class="container--content">
      <br>
      <h1>Top secret <spoiler>gibberish</spoiler></h1>
      <br>
      <br>
      <br>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, <spoiler>sed do eiusmod tempor incididunt ut</spoiler> labore et dolore magna aliqua. Ut enim ad minim veniam, quis <spoiler>nostrud exercitation ullamco laboris</spoiler> nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in <spoiler>reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</spoiler> Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt <spoiler>mollit anim id</spoiler> est laborum.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco <spoiler>laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit</spoiler> in voluptate velit esse cillum dolore eu fugiat nulla pariatur. <spoiler>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</spoiler>.
      </p>
      <br>
      <spoiler-image src="test.png" />
      <br>
      <br>
      <p>
        Lorem ipsum dolor sit amet, <spoiler>consectetur adipiscing elit, sed do eiusmod tempor incididunt</spoiler> ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud <spoiler>exercitation ullamco laboris nisi</spoiler> ut aliquip ex ea commodo consequat. Duis aute irure dolor in <spoiler>reprehenderit in</spoiler> voluptate velit esse cillum dolore <spoiler>eu fugiat nulla pariatur</spoiler>. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt <spoiler>mollit anim</spoiler> id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing <spoiler>elit, sed do eiusmod</spoiler> tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <spoiler>Duis aute irure dolor in reprehenderit</spoiler> in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui <spoiler>officia deserunt mollit anim id est laborum.</spoiler>
      </p>
    </div>
  </div>
</template>

<script>
import Spoiler from '@/components/spoiler/spoiler';
import SpoilerImage from '@/components/spoiler/spoilerImage';

export default {
  name: 'TopSecret',
  components: {
    Spoiler,
    SpoilerImage
  }
}
</script>
