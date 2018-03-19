import Wait from '@/api/waits'
import Ticket from '@/api/ticket'
import { mathRegression } from '@/utils'

const count = {
  state: {
    local: 'shanghai',
    st: '2018-02-20',
    et: '2018-03-17',
    parkList: [],
    ticketList: [],
    tickets: {},
    isLoad: {
      parkList: false
    }
  },
  mutations: {
    SET_PARK_LIST: (state, data) => {
      state.parkList = data
      state.isLoad.parkList = true
    },
    SET_TICKET_LIST: (state, data) => {
      const { parkList, tickets } = state
      parkList.forEach(item => {
        const { date } = item
        Object.assign(item, tickets[date])
      })

      state.ticketList = data
      state.isLoad.parkList = true
    },
    SET_TICKETS: (state, data, date) => {
      if (date) {
        state.tickets[date] = data
      } else {
        state.tickets = data
      }
    },
    MARGE_PARK_TICKET_LIST: state => {
      const { parkList, ticketList } = state
      if (parkList.length > 0 && ticketList.length > 0) {
        parkList.forEach(item => {})
      }
    },
    SET_MATH: (state, data) => {
      const { parkList } = state
      parkList.forEach(item => {
        item.flowFt = Math.round(mathRegression(data, item.ticketNum))
      })
    }
  },
  actions: {
    // 乐园统计信息
    async getParkCountList({ commit, state }) {
      const { local, st, et } = state
      const arg = {
        st,
        et
      }
      const data = await Wait.waitCountPark(local, arg)
      data.reverse()
      commit('SET_PARK_LIST', data)
    },
    // 售票量统计
    async getTicketList({ commit, state }) {
      const { local, st, et } = state
      const arg = {
        st,
        et
      }
      const data = await Ticket.available(local, arg)

      const tickets = {}
      data.forEach(item => {
        item.ticketNum = 20000 - item.availableCount
        const { date } = item
        tickets[date] = item
      })
      commit('SET_TICKETS', tickets)
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
