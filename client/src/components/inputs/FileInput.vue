<template>
  <div class="input-file">
    <div class="input-file__input">
      <input 
        ref="input"
        type="file" 
        :multiple="multiple"
        :disabled="disabled || files.length >= maxFiles"
        :name="name"
        @input="(handle($event))"
      >
      <div v-if="files.length < maxFiles">
        <file-icon />
        <p><b>Drag and drop</b> {{fileLabel}} here</p>
        <p>or <em>browse</em> to select {{fileLabel}}</p>
      </div>
      <div v-else>
        <p>Max file count reached. Delete a file if you want to add another one</p>
      </div>
    </div>
    <div class="input-file__files" v-if="files.length > 0">
      <p class="input-file__files_counter" v-if="multiple">Files: {{files.length}}</p>
      <p class="input-file__files_counter" v-if="maxSize">Max size: {{maxSize | formatFileSize}}</p>
      <ul>
        <li v-for="file in files" 
          :key="file.name" 
          :title="file.name" 
          :class="{'file--too-big': file.size > maxSize}">
          <div class="file-name">
            <span class="file-icon">
              <file-icon-with-label :label="file.name | fileExtension"/>
            </span>
            <span class="file-name__name">{{file.name}} <span v-if="!validFileTypes.includes(file.type)">Invalid file type</span></span>
          </div>
          <div>
            <span class="file-size">{{file.size | formatFileSize}}</span>
            <button @click="removeFile(file.name)">Delete</button>
          </div>
        </li>
      </ul>
      <p v-if="!isValid">{{errorMessage}}</p>
    </div>
  </div>
</template>

<script>
import bytesToSize from '@/utils/bytesToSize';

import FileIcon from '@/components/icons/fileInput/FileIcon'
import FileIconWithLabel from '@/components/icons/fileInput/FileIconWithLabel'

export default {
  name: 'FileInput',
  components: {
    FileIcon, FileIconWithLabel
  },
  data() {
    return {
      files: [],
      maxSize: 10000, // bytes
      maxFiles: 3,
      errorMessage: '',
      validFileTypes: [
        'application/pdf',
        'image/svg+xml'
      ]
    }
  },
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: Boolean,
    name: String,
    value: String,
    placeholder: String,
    accept: String
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
      if (this.files.length === 0) {
        this.errorMessage = ''
        return true
      }

      // if ((this.files.filter(file => this.validFileTypes.includes(file.type)).length !== this.files.length)) {
      if ((this.files.some(file => !this.validFileTypes.includes(file.type)))) {
        this.errorMessage = 'some are not a valid type'
        // some file is not a valid file type
        return false
      }

      if (this.files.some(file => file.size > this.maxSize)) {
        this.errorMessage = 'some are too large'
        // some file is too large
        return false
      }

      if (this.files.length > this.maxFiles) {
        this.errorMessage = 'there are too many files'
        // too many files
        return false
      }

      this.errorMessage = ''
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
      }, []).slice(0, this.maxFiles)

      // reset input
      e.target.value = ''
    },
    removeFile(name) {
      this.files = this.files.filter(item => item.name !== name)
    }
  },
  watch: {
    files() {
      this.$emit('files', this.files)
    }
  }
}
</script>
