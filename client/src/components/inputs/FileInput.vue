<template>
  <div class="input-group fieldset-group input-file" :class="[classes, {'dropzone-active': draggingFilesOver && !disabled}]">
    <label class="fieldset-label" for="">
      <span>{{label}}</span>
      <span class="" v-if="maxSize">Max size: {{maxSize | formatFileSize}}</span>
    </label>
    <div class="input-file__input">
      <input
        ref="input"
        type="file"
        :accept="accept"
        :multiple="multiple"
        :disabled="disabled || maxFiles && files.length >= maxFiles"
        :name="name"
        @input="(handle($event))"
        @blur="blur"
        @dragenter="dragenter"
        @dragleave="dragleave"
        @drop="dragleave"
      >
      <div v-if="disabled">
        <file-icon />
        <p>File input disabled</p>
      </div>
      <div v-else-if="draggingFilesOver && !disabled">
        <p>Now let go 👍</p>
      </div>
      <div v-else-if="!maxFiles || files.length < maxFiles">
        <file-icon />
        <p><b>Drag and drop</b> {{fileLabel}} here</p>
        <p>or <em>browse</em> to select {{fileLabel}}</p>
      </div>
      <div v-else>
        <p>Max file count reached. Remove a file if you want to add another one</p>
      </div>
    </div>
    <div class="input-file__files" v-if="files.length > 0">
      <ul>
        <li v-for="file in files"
          :key="file.name"
          :title="file.name"
          :class="{'file--too-big': maxSize && file.size > maxSize, 'file--wrong-type': validFileTypes.length > 0 && !validFileTypes.includes(file.type)}">
          <div class="file-name">
            <span class="file-icon">
              <file-icon-with-label :label="file.name | fileExtension"/>
            </span>
            <span class="file-name__name">{{file.name}} <span v-if="validFileTypes.length > 0 && !validFileTypes.includes(file.type)">Invalid file type</span></span>
          </div>
          <div class="file-right">
            <span class="file-size"><span v-if="maxSize && file.size > maxSize">Too large</span> {{file.size | formatFileSize}}</span>
            <button @click.prevent="removeFile(file.name)" title="Remove file" class="btn-icon file-remove-button">
              <icon-base iconName="Remove file" width="12" height="12">
                <icon-close />
              </icon-base>
            </button>
          </div>
        </li>
      </ul>
    </div>
    <p class="helper-text">{{helperText}}. Files: {{files.length}} <template v-if="maxFiles">/ {{maxFiles}} max</template></p>
  </div>
</template>

<script>
import { formValidation } from '@/mixins/formValidation';

import bytesToSize from '@/utils/bytesToSize';

import FileIcon from '@/components/icons/fileInput/FileIcon'
import FileIconWithLabel from '@/components/icons/fileInput/FileIconWithLabel'
import IconBase from '@/components/icons/IconBase'
import IconClose from '@/components/icons/IconClose'

export default {
  name: 'FileInput',
  mixins: [formValidation],
  components: {
    FileIcon, FileIconWithLabel, IconBase, IconClose
  },
  data() {
    return {
      files: [],
      draggingFilesOver: false
    }
  },
  props: {
    multiple: {
      type: Boolean,
      default: true
    },
    maxFiles: {
      type: [Boolean, Number],
      default: false
    },
    maxSize: { // bytes
      type: [Boolean, Number],
      default: false
    },
    accept: {
      type: String
    },
    validFileTypes: {     // this is needed to perform additional file type validation 
      type: Array,        // as 'accept' only hides other file types from the user. They can easily bypass 'accept'
      default: () => []   // extensive list at https://www.iana.org/assignments/media-types/media-types.xhtml
    }
  },
  filters: {
    formatFileSize(value) {
      return bytesToSize(value)
    },
    fileExtension(value) {
      return value.split('.').pop()
    }
  },
  computed: {
    fileLabel() {
      return this.multiple ? 'files' : 'file'
    },
    isValid() {
      if (this.disabled) {
        return true;
      }

      if (this.required && this.files.length === 0) {
        this.errorText = this.requiredMessage !== '' ? this.requiredMessage : this.defaultMessages.required;
        return false;
      }

      // if ((this.files.filter(file => this.validFileTypes.includes(file.type)).length !== this.files.length)) {
      if (this.validFileTypes.length > 0 && (this.files.some(file => !this.validFileTypes.includes(file.type)))) {
        this.errorText = 'Please remove unsupported file types'
        // some file is not a valid file type
        return false
      }

      if (this.maxSize && this.files.some(file => file.size > this.maxSize)) {
        this.errorText = 'Please remove files larger than ' + bytesToSize(this.maxSize)
        // some file is too large
        return false
      }

      if (this.maxFiles && this.files.length > this.maxFiles) {
        this.errorText = `A maximum of ${this.maxFiles} ${this.fileLabel} ${this.multiple ? 'are' : 'is'} allowed`
        // too many files
        return false
      }

      this.errorText = ''
      return true
    }
  },
  methods: {
    handle(e) {
      const files = Array.from(e.target.files)

      if (!this.multiple) {
        this.files = files
        e.target.value = ''
        return
      }

      this.files = this.files.concat(files).reduce((acc, curr) => {
        if (!acc.find(item => item.name === curr.name)) {
          acc.push(curr);
        }
        return acc
      }, []).slice(0, this.maxFiles ? this.maxFiles : this.files.length + files.length)

      // reset input
      e.target.value = ''
    },
    removeFile(name) {
      this.files = this.files.filter(item => item.name !== name)
    },
    dragenter(ev) {
      console.log('file enter input')
      this.draggingFilesOver = true
    },
    dragleave(ev) {
      console.log('file leave input')
      this.draggingFilesOver = false
    }
  },
  watch: {
    files() {
      this.$emit('file', this.files)
    }
  }
}
</script>
