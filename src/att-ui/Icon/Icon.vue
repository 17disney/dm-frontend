<template>
  <div class="icon--pep" :class="'icon__' + name"></div>
</template>

<script>
export default {
  name: 'att-icon',
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  },

  components: {},

  computed: {},

  mounted() { },

  methods: {}
}

</script>

