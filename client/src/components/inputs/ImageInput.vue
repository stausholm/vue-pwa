<template>
  <div class="input-group fieldset-group input-image" :class="classes">
    <label for="" class="fieldset-label">{{label}}</label>
    <div class="placeholder" @click="handleClick">
      <div class="placeholder__text" v-if="!base64Image">
        <icon-base iconName="camera" width="24" height="24">
          <icon-photo-camera />
        </icon-base>
        <span>{{placeholder}}</span>
      </div>
      <div class="input-image__preview-wrapper" v-else>
        <img :src="base64Image" alt="" class="input-image__preview">
        <span class="wrapper-label">
          <icon-base iconName="camera" width="16" height="16">
            <icon-photo-camera />
          </icon-base>
          Edit
        </span>
      </div>
    </div>
    <div class="input-wrapper">
      <input type="file" 
        ref="image"
        accept="image/*"
        class="input-image__input visually-hidden"
        :disabled="disabled"
        :name="name"
        :value="value"
        @input="$emit('input', formatImage($event))"
        @focus="classObject.focused = true"
        @blur="blur"
        :placeholder="placeholder">
    </div>
    <p class="helper-text">{{helperText}}. Size: {{fileSizeFormatted}}</p>
  </div>
</template>

<script>
import { formValidation } from '@/mixins/formValidation';

import IconBase from '@/components/icons/IconBase';
import IconPhotoCamera from '@/components/icons//IconPhotoCamera';

import bytesToSize from '@/utils/bytesToSize';

export default {
  name: 'ImageInput',
  mixins: [formValidation],
  components: {IconBase, IconPhotoCamera},
  props: {
    
  },
  data() {
    return {
      base64Image: null,
      fileByteSize: 0
    }
  },
  computed: {
    fileSizeFormatted() {
      return bytesToSize(this.fileByteSize)
    },
    maxSizeFormatted() {
      if (this.validations.maxSize) {
        return bytesToSize(this.validations.maxSize)
      }
      return false
    },
    // isValid() {
    //   return false
    // }
  },
  methods: {
    formatImage(e) {
      if (!e.target.value) {
        this.$emit('file', '')
        return ''
      }

      const file = e.target.files[0]
      const reader = new FileReader
      reader.onload = ev => {
        const bytes = new Uint8Array(ev.target.result)
        // const bytes = ev.target.result
        this.$emit('file', bytes)
      }
      reader.readAsArrayBuffer(file)
      // reader.readAsDataURL(file)
      
      return e.target.value
    },
    handleClick() {
      this.$refs.image.focus()
      this.$refs.image.click()
    }
  },
  watch: {
    value() {
      console.log('value changed')
      if (!this.value) {
        this.fileByteSize = 0
        this.base64Image = null
        return 
      }

      const file = this.$refs.image.files[0]
      this.fileByteSize = file.size
      const reader = new FileReader
      reader.onload = e => {
        this.base64Image = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }
}
</script>