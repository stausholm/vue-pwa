<template>
  <div>
    <div class="container--content">
      <h1>this is example</h1>
      <cta-button-icon>
        <template slot="text">amazing cta text</template>
        <template slot="icon">
          <icon-base iconName="CTA" width="18" height="18">
            <icon-beach-access />
          </icon-base>
        </template>
      </cta-button-icon>
    </div>
  </div>
</template>

<script>
import CTAButtonWithIcon from '@/components/buttons/CTAButtonWithIcon';
import IconBase from '@/components/icons/IconBase';
import IconBeachAccess from '@/components/icons/IconBeachAccess';

export default {
  name: 'Example',
  components: {
    'cta-button-icon': CTAButtonWithIcon,
    IconBase,
    IconBeachAccess
  }
}
</script>
