/* eslint-disable vue/no-side-effects-in-computed-properties */
<template>

  <b-container>
    <b-row>
      <b-col cols="6" sm="4" lg="2"
        :key="index"
        v-for="(item, index) in currentPageItems"
          >
        <b-card
          :bg-variant="item.variant"
          text-variant="white"
          :header="item.title"
          class="text-center"
          >
          <p class="card-text">
            {{item.body}}
          </p>
        </b-card>

      </b-col>

    </b-row>

    <b-row>
      <b-col md="6" class="my-1">
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
      </b-col>
    </b-row>
  </b-container>

</template>

<script>
const items = [
  {
    title: 'Primary',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    variant: 'primary'
  },
  {
    title: 'Secondary',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    variant: 'secondary'
  },
  {
    title: 'Success',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    variant: 'success'
  },
  {
    title: 'Info',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    variant: 'info'
  },
  {
    title: 'Warning',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    variant: 'warning'
  },
  {
    title: 'Danger',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    variant: 'danger'
  },
  {
    title: 'Primary',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    variant: 'primary'
  },
  {
    title: 'Secondary',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    variant: 'secondary'
  },
  {
    title: 'Success',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    variant: 'success'
  },
  {
    title: 'Info',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    variant: 'info'
  },
  {
    title: 'Warning',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    variant: 'warning'
  },
  {
    title: 'Danger',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    variant: 'danger'
  }
]

export default {
  name: 'MyBootstrapGrid',
  data () {
    return {
      items: items,
      currentPage: 1,
      perPage: 10,
      totalRows: items.length,
      paginated_items: {},
      currentPageIndex: 0,
      nbPages: 0
    }
  },
  computed: {
    pageCount () {
      // eslint-disable-next-line one-var
      let l = this.totalRows,
        s = this.perPage
      return Math.floor(l / s)
    },
    currentPageItems () {
      let lengthAll = this.items.length
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.nbPages = 0
      for (let i = 0; i < lengthAll; i = i + this.perPage) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.paginated_items[this.nbPages] = this.items.slice(i, i + this.perPage)
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.nbPages++
      }
      return this.paginated_items[this.currentPage - 1]
    }
  },
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
