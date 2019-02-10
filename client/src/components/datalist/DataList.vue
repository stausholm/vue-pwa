<template>
  <div class="datalist">
    <div class="datalist-controls">
      <input type="search" name="query" v-model="searchQuery" @input="movePages(0)" placeholder="Search...">
    </div>
    <div class="datalist-table-wrapper">
      <table class="datalist-table" 
        :class="{'datalist-table--fixed': fixed, 
          'datalist-table--stripes': stripes, 
          'datalist-table--condensed': condensed}"
        :style="{minWidth: columns.length * 150 + 'px'}">
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
    </div>
    <p class="datalist-no-data" v-if="filteredData.length === 0">No data that matches your search!</p>
    <div class="datalist-footer">
      <p class="datalist-footer-showing-count">{{ countMessage }}</p>
      <div>
        <div class="datalist-pagesize">
          <span>Show</span>
          <div class="datalist-select-wrapper">
            <select v-model="rowsPerPage" @input="movePages(0)">
              <option v-for="pageSize in pageSizeMenu" :value="pageSize" :key="'size'+pageSize">{{pageSize}}</option>
            </select>
            <icon-base iconName="select page size" width="18" height="18">
              <icon-arrow-down />
            </icon-base>
          </div>
          <span>items per page</span>
        </div>
        <div class="datalist-pagination" v-if="filteredData.length > rowsPerPage">
          <p>Page {{startRow / rowsPerPage + 1}} of {{Math.ceil(filteredData.length / rowsPerPage)}}</p>
          <p class="datalist-pagination-mobile">{{ countMessage }}</p>
          <div>
            <button class="btn-icon btn-icon--scale-on-active" @click="movePages(-1)" :disabled="startRow === 0">
              <icon-base iconName="Previous page" width="24" height="24">
                <icon-arrow-left />
              </icon-base>
            </button>
            <button class="btn-icon btn-icon--scale-on-active" @click="movePages(1)" :disabled="(startRow / rowsPerPage + 1) === Math.ceil(filteredData.length / rowsPerPage)">
              <icon-base iconName="next page" width="24" height="24">
                <icon-arrow-right />
              </icon-base>
            </button>
          </div>
        </div>
        <p class="datalist-pagination-mobile" v-else-if="filteredData.length > 0">{{ countMessage }}</p>
        <p class="datalist-pagination-mobile" v-else>Nothing to show!</p>
      </div>
    </div>
  </div>
</template>

<script>
import IconBase from '@/components/icons/IconBase'
import IconArrowLeft from '@/components/icons/IconArrowLeft'
import IconArrowRight from '@/components/icons/IconArrowRight'
import IconArrowDown from '@/components/icons/IconArrowDown'

//https://vuejs.org/v2/examples/grid-component.html
//https://alligator.io/vuejs/grid-component/
export default {
  name: "DataList",
  components: {
    IconBase, IconArrowLeft, IconArrowRight, IconArrowDown
  },
  props: {
    data: Array,
    columns: Array,
    fixed: {
      type: Boolean,
      default: true
    },
    stripes: {
      type: Boolean,
      default: true
    },
    condensed: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      searchQuery: '',
      sortKey: '',
      sortOrders: {},
      startRow: 0,
      rowsPerPage: 10,
      pageSizeMenu: [10, 20, 50, 100]
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
    },
    countMessage() {
      let startRow = this.startRow + 1;
      let endRow = startRow + this.dataPerPage.length - 1;
      let total = this.filteredData.length;
      return `Showing ${startRow} - ${endRow} of ${total}`;
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
      if (amount === 0) { // method called by pageSize select menu, reset back to first page
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