// import Cookies from 'js-cookie'
// import moment from 'moment'
import Forecast from 'packages/17disney-common/api/forecast'

const app = {
  state: {
    ticketList: [],
    tickets: {},
    dayList: [],
    days: {},
    weatherHistoryList: [],
    weatherHistorys: {},
    weatherForecastList: [],
    weatherForecasts: {}
  },
  mutations: {
    SET_DATAS: (state, arg) => {
      const { data, name } = arg

      const datas = {}
      data.forEach(item => {
        datas[item.date] = item
      })
      state[name + 'List'] = data
      state[name + 's'] = datas
    }
  },
  actions: {
    async getTickets({ commit, state }, arg) {
      const { st, et } = arg
      const data = await Forecast.tickets('shanghai', st, et)
      commit('SET_DATAS', { data, name: 'ticket' })
    },
    async getDays({ commit, state }, arg) {
      const { st, et } = arg
      const data = await Forecast.dayRank(st, et)
      commit('SET_DATAS', { data, name: 'day' })
    },
    async getWeatherHistory({ commit, state }, arg) {
      const { st, et } = arg
      const data = await Forecast.weatherHistory(st, et)
      commit('SET_DATAS', { data, name: 'weatherHistory' })
    }
  }
}

export default app
