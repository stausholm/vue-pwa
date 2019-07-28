<template>
  <div>
    <div class="container--content">
      <h1>Danger Zone</h1>
      <p>
        Delete all locally stored application data.
        Deleting your data is a permanent and irreversible action.
        Please be sure before proceeding.
      </p>
      <button class="btn btn--danger" @click="showModal = true">Delete application data</button>

      <modal-advanced
        v-if="showModal"
        @close="showModal = false"
        @accept="deleteData"
        header="Delete all data"
        confirmLabel="Delete"
        :confirmIsDestructive="true">
        <p>Permanently delete all locally stored data?</p>
      </modal-advanced>

      <loader-overlay v-if="deletingData" message="deleting data..." />
    </div>
  </div>
</template>

<script>
import ModalAdvanced from '@/components/modal/ModalAdvanced'
import LoaderOverlay from '@/components/loader/LoaderOverlay'

export default {
  name: 'About',
  components: {
    ModalAdvanced, LoaderOverlay
  },
  data() {
    return {
      showModal: false,
      deletingData: false
    }
  },
  computed: {

  },
  methods: {
    deleteData() {
      this.deletingData = true;
      this.showModal = false;
      setTimeout(() => {
        localStorage.clear();
        
        this.$store.dispatch('changeNotification', {content: 'Data deleted', duration: 3000})

        this.returnToStart();
      }, 500)
    },
    returnToStart() {
      window.location.href = window.location.origin
    }
  }
}
</script>
