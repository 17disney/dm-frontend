import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState({
      local: state => state.explorer.local,
      attType: state => state.explorer.attType,
      playType: state => state.explorer.playType
    }),
    ...mapGetters(['attListFilter', 'attractionList', 'attFind'])
  },

  methods: {
    ...mapActions([
      'getDestinationsList',
      'getDestinationsRawList',
      'getAttractionsWait',
      'getSchedules'
    ])
  }
}
