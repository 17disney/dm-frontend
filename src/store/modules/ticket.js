import Ticket from '@/common/api/ticket'
import { mathRegression } from '@/utils'
// mathArrAvg
const count = {
  state: {
    local: 'shanghai',
    st: '2018-02-20',
    et: '2018-03-07',
    attsWait: {},
    parkList: [],
    ticketList: [],
    tickets: {},
    isLoad: {
      parkList: false
    },
    fts: {},
    ftRate: {
      flowIn: 0
    }
  },

  mutations: {

    SET_TICKET_LIST: (state, data) => {
      state.ticketList = data
      state.isLoad.parkList = true
    },
    SET_TICKETS: (state, data, date) => {
      if (date) {
        state.tickets[date] = data
      } else {
        const tickets = {}
        data.forEach(item => {
          item.ticketNum = 20000 - item.availableCount
          const { date } = item
          tickets[date] = item
        })
        state.tickets = tickets
      }
    },
    // 计算
    SET_MATH: (state, data) => {
      // data = [21071.309595351056, 2.0166155002669033]
      const { parkList, tickets } = state
      // const flowRateList = []
      const fts = {}
      parkList.forEach(item => {
        const { flowMax, date } = item
        const ticketNum = tickets[date]['ticketNum']
        const flowFt = Math.round(mathRegression(data, ticketNum))
        const flowRate = Math.round(
          100 - Math.abs((flowFt - flowMax) / flowMax) * 100
        )

        fts[date] = {
          flowFt,
          flowRate
        }
        // flowRateList.push(flowRate)
        // item.flowRate = flowRate
      })

      state.fts = fts

      // state.ftRate.flowIn = mathArrAvg(flowRateList)
    }
  },
  actions: {

    // 获取售票量统计列表
    async getTicketList({ commit, state }) {
      const { local, st, et } = state
      const arg = {
        st,
        et
      }
      const data = await Ticket.available(local, arg)
      commit('SET_TICKETS', data)
      commit('SET_TICKET_LIST', data)
    },
    async getTicketDate({ commit, state }, date) {
      const { local } = state
      const data = await Ticket.availableDate(local, date)
      commit('SET_TICKETS', data, date)
    },
    mathParkCount({ commit, state }, data) {
      commit('SET_MATH', data)
    }
  }
}

export default count
