import moment from 'moment'
import Local from '@/common/const/local'
import WaitTimes from '17disney-common/api/wait-times'
import { lineToObject } from '@/utils/tool'
import attType from '@/common/data/att-type'
import playType from '@/common/data/play-type'

const explorer = {
  state: {
    local: 'shanghai',
    utc: -1,
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
    },
    attFind: (state, getters) => aid => {
      return state.attList.find(item => item.aid === aid)
    }
  },

  mutations: {
    SET_LOCAL: (state, data) => {
      const { utc } = Local.find(_ => _.value === data)
      state.utc = utc
      state.local = data
    },

    SET_FACET_GROUPS: (state, data) => {
      state.facetGroups = data
    },

    SET_ATT_LIST: (state, data) => {
      data.forEach(item => {
        const { id } = item
        item.aid = lineToObject(id)['__id__']
      })
      state.attList = data
    },

    SET_ATT_RAW_LIST: (state, data) => {
      data.forEach(item => {
        item.type = item.type.toLowerCase()
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
    // 获取项目列表(原始)
    async getDestinationsRawList({ commit, state }) {
      const data = await WaitTimes.destinationsRaw(state.local)
      if (data) {
        const { added, facetGroups } = data
        commit('SET_ATT_RAW_LIST', added)
        commit('SET_FACET_GROUPS', facetGroups)
      }
    },
    // 获取项目列表
    async getDestinationsList({ commit, state }) {
      const data = await WaitTimes.destinations(state.local, {
        type: 'attraction'
      })
      if (data) {
        commit('SET_ATT_LIST', data)
      }
    },
    // 获取时间表
    async getSchedules({ commit, state }, date) {
      const data = await WaitTimes.schedules(state.local, date)
      commit('SET_SCHEDULES', data)
    },
    // 设置地区
    setLocal({ commit }, data) {
      commit('SET_LOCAL', data)
    }
  }
}

export default explorer
