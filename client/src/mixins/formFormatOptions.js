export const formFormatOptions = {
  computed: {
    formattedOptions() {
      if (typeof this.options[0] === 'string') {
        if (this.sortDir === 'asc') {
          return this.options.map(item => ({label: item, value: item})).sort(this.sortAsc)
        } else if (this.sortDir === 'desc') {
          return this.options.map(item => ({label: item, value: item})).sort(this.sortDesc)
        }
        return this.options.map(item => ({label: item, value: item}))
      }


      if (this.sortDir === 'asc') {
        return this.options.map(item => item).sort(this.sortAsc)
      } else if (this.sortDir === 'desc') {
        return this.options.map(item => item).sort(this.sortDesc)
      }

      return this.options
    }
  },
  methods: {
    sortAsc(a, b) {
      const labelA = a.label.toLowerCase()
      const labelB = b.label.toLowerCase()
      return labelA > labelB ? 1 : -1
    },
    sortDesc(a, b) {
      const labelA = a.label.toLowerCase()
      const labelB = b.label.toLowerCase()
      return labelA < labelB ? 1 : -1
    }
  }
}