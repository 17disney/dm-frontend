import moment from 'moment'
import Explorer from '@/common/api/explorer'
import { lineToObject } from '@/utils/tool'
import attType from '@/common/data/att-type'
import playType from '@/common/data/play-type'
const explorer = {
  state: {
    local: 'shanghai',
    date: moment().format('YYYY-MM-DD'),
    attList: [],
    attRawList: [],
    facetGroups: {},
    schedules: {},
    attType,
    playType
  },
  getters: {
    landList: (state, getters) => {
      return state.attList.filter(item => item.type === 'land')
    },
    attractionList: (state, getters) => {
      return state.attList.filter(item => item.type === 'attraction')
    },
    attListFilter: (state, getters) => type => {
      return state.attList.filter(item => item.type === type)
    },
    attRawListFilter: (state, getters) => type => {
      return state.attRawList.filter(item => item.type === type)
    }
  },
  mutations: {
    SET_FACET_GROUPS: (state, data) => {
      state.facetGroups = data
    },

    SET_ATT_LIST: (state, data) => {
      state.attList = data
    },

    SET_ATT_RAW_LIST: (state, data) => {
      data.forEach(item => {
        // const { id, medias } = item
        // item.aid = lineToObject(id)['__id__']

        // for (const ancestorsItem of ancestors) {
        //   if (ancestorsItem.type === 'land') {
        //     // item.landName = landName(ancestorsItem.id)
        //   }
        // }

        item.type = item.type.toLowerCase()
        // 提取坐标
        // item.coordinates = [0, 0]
        // if (
        //   item.relatedLocations &&
        //   item.relatedLocations[0] &&
        //   item.relatedLocations[0]['coordinates'] &&
        //   item.relatedLocations[0]['coordinates'][0]
        // ) {
        //   let coordinates = item.relatedLocations[0]['coordinates'][0]
        //   const { latitude, longitude } = coordinates
        //   coordinates = [latitude, longitude].map(parseFloat)
        //   coordinates[0] = coordinates[0] + 0.0003
        //   coordinates[1] = coordinates[1] - 0.0001
        //   item.coordinates = coordinates
        // }

        // 提取主图
        // if (medias && medias.constructor === Array) {
        //   item.finderListMobileSquare = medias.filter(_ => {
        //     return _.type === 'finderListMobileSquare'
        //   })[0]
        // }
      })
      state.attRawList = data
    },

    SET_SCHEDULES: (state, data) => {
      let activities = []
      for (const item of data) {
        activities = activities.concat(item.body.activities)
      }
      data = {}
      activities.forEach(item => {
        const aid = lineToObject(item.id)['__id__']
        if (item.schedule && item.schedule.schedules) {
          data[aid] = item.schedule.schedules
        }
      })
      state.schedules = data
    }
  },
  actions: {
    // 获取项目列表
    async getDestinationsRawList({ commit, state }) {
      const data = await Explorer.destinationsRaw(state.local)
      if (data) {
        const { added, facetGroups } = data
        commit('SET_ATT_RAW_LIST', added)
        commit('SET_FACET_GROUPS', facetGroups)
      }
    },

    async getDestinationsList({ commit, state }) {
      const data = await Explorer.destinations(state.local)
      if (data) {
        commit('SET_ATT_LIST', data)
      }
    },

    // // 获取项目列表
    // async getDestinationsRawList({ commit, state }) {
    //   const data = await Explorer.destinationsRaw(state.local)
    //   const { added, facetGroups } = data
    //   commit('SET_ATT_LIST', added)
    //   commit('SET_FACET_GROUPS', facetGroups)
    // },

    // 获取时间表
    async getSchedules({ commit, state }, date) {
      const data = await Explorer.schedules(state.local, date)
      commit('SET_SCHEDULES', data)
    }
  }
}

export default explorer
