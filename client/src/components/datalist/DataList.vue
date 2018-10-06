<template>
  <div class="datalist">
    <div class="datalist__controls">
      <input type="search" name="query" v-model="searchQuery" placeholder="Search...">
      <select v-model="rowsPerPage" @input="movePages(0)">
        <option v-for="pageSize in pageSizeMenu" :value="pageSize" :key="'size'+pageSize">{{pageSize}}</option>
      </select>
      <p>Items: {{ filteredData.length }}</p>
    </div>
    <div class="datalist-table-wrapper">
      <table class="datalist-table" :class="{'datalist-table--fixed': fixed}">
        <thead class="table-header">
          <tr>
            <th v-for="key in columns"
              @click="sortBy(key)"
              :class="{ active: sortKey == key }"
              :key="key"
            >
              {{ key | capitalize }}
              <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'"></span>
            </th>
          </tr>
        </thead>
        <tbody class="table-body">
          <tr v-for="(entry, i) in dataPerPage" :key="'row'+i">
            <td v-for="(key, j) in columns" 
              :key="'data'+ j + i" 
              :inner-html.prop="entry[key] ? entry[key] : '--' | highlightmatch(searchQuery)">
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="filteredData.length === 0">No data that matches your search!</p>
    </div>
    <div class="datalist-pagination" v-if="filteredData.length > 0">
      <button @click="movePages(-1)">Back</button>
      <p>{{startRow / rowsPerPage + 1}} out of {{Math.ceil(filteredData.length / rowsPerPage)}}</p>
      <button @click="movePages(1)">Next</button>
    </div>
    <p style="margin-top:200px">more height!</p>
    <p style="margin-top:200px">more height!</p>
  </div>
</template>

<script>
//https://vuejs.org/v2/examples/grid-component.html
//https://alligator.io/vuejs/grid-component/
export default {
  name: "DataList",
  props: {
    data: Array,
    columns: Array,
    fixed: {
      type: Boolean,
      default: true
    }
  },
  data(){
    return {
      searchQuery: '',
      sortKey: '',
      sortOrders: {},
      startRow: 0,
      rowsPerPage: 2,
      pageSizeMenu: [2, 20, 50, 100]
    }
  },
  computed: {
    filteredData() {
      let sortKey = this.sortKey;
      let filterKey = this.searchQuery && this.searchQuery.toLowerCase();
      let order = this.sortOrders[sortKey] || 1;
      let data = this.data;

      if (filterKey) { // search input has value, so filter based on this.searchQuery
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
          })
        })
      }
      if (sortKey) {
        data = data.slice().sort(function (a, b) {
          a = a[sortKey] ? a[sortKey].toLowerCase() : '--';
          b = b[sortKey] ? b[sortKey].toLowerCase() : '--';
          return (a === b ? 0 : a > b ? 1 : -1) * order;
        })
      }
      return data;
    },
    dataPerPage() {
      return this.filteredData.filter((item, index) => index >= this.startRow && index < (this.startRow + this.rowsPerPage))
    }
  },
  filters: {
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    highlightmatch(words, query) { // taken from searchbar.vue
      if (!query) { // if searchQuery is empty, then just return the word instead of applying filter to every single letter
        return words;
      }
      const queryWords = `(${query.trim().split(' ').join('|')})`; 
      const re = new RegExp(queryWords, 'ig'); // /(ht|m|l)/gi
      return words.toString().replace(re, function(matchedTxt, a, b) {
        return (`<b class="highlight">${matchedTxt}</b>`);
      });
    }
  },
  methods: {
    sortBy(key) {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1 // switch between 1 and -1
    },
    movePages(amount) {
      if (amount === 0) {
        return this.startRow = 0;
      }
      let newStartRow = this.startRow + (amount * this.rowsPerPage);
      console.log(newStartRow)
      if (newStartRow >= 0 && newStartRow < this.filteredData.length) {
        this.startRow = newStartRow;
      }
    }
  },
  created(){
    let sortOrders = {};
    this.columns.forEach(function (key) {
      sortOrders[key] = 1;
    })
    this.sortOrders = sortOrders;
  }
}
</script>

<style lang="scss">
.datalist-table-wrapper {
  overflow: auto;

  .datalist-table {
    min-width: 600px;
  }
}

.datalist-table {
  display: table;
  width: 100%;
  border-collapse: collapse;

  &--fixed {
    table-layout: fixed;
  }

  tr {
    display: table-row;
    line-height: 30px;
    font-weight: 300;
    font-size: 12px;
    color: #333;

    td, th {
      display: table-cell;
      padding: 0 10px;
    }

    th {
      font-weight: 400;
      text-align: left;
      border-bottom: 1px solid #eaeaea;
      font-size: 11px;
      color: #666;
      user-select: none;
      cursor: pointer;

      .arrow {
        display: inline-block;
        vertical-align: middle;
        width: 0;
        height: 0;
        margin-left: 5px;
        opacity: 0.66;

        &.asc {
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-bottom: 4px solid currentColor;
        }

        &.dsc {
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 4px solid currentColor;
        }
      }

      &.active {
        font-weight: 600;

        .arrow {
          opacity: 1;
        }
      }
    }

    .highlight {
      background-color: rgba(0,0,0,.1)
    }
  }
}
</style>
