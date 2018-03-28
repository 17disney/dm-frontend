import Wait from '@/common/api/waits'
import moment from 'moment'
import { mathRegression } from '@/utils'
// mathArrAvg
const count = {
  state: {
    local: 'shanghai',
    st: '2018-02-20',
    et: moment().format('YYYY-MM-DD'),
    date: moment().format('YYYY-MM-DD'),
    attsWait: {},
    parkList: [],
    parks: {},
    loading: {
      attsWait: true
    }
  },
  getters: {
    parkTargetList: (state, getters) => id => {
      return state.parkList.map(_ => _[id])
    }
    // parkCountList: (state, getters) => {
    //   const list = []
    //   const { parkList, tickets, fts } = state

    //   parkList.forEach(item => {
    //     const { date } = item
    //     list.push(Object.assign({}, item, tickets[date], fts[date]))
    //   })

    //   return list
    // }
  },

  mutations: {
    SET_ATTS_WAIT: (state, data) => {
      const waits = {}
      data.forEach(item => {
        const { fpList, waitList, endTime } = item

        if (fpList && fpList.length > 0) {
          item.fpAvailable = true
          const [utime, fpStartTime] = fpList[0]
          item.fpStatus = true
          item.fpUtime = utime
          if (fpStartTime === 'FASTPASS is Not Available') {
            item.fpStatus = false
          } else {
            item.fpStartTime = moment(fpStartTime, 'HH:mm:ss').format('H:mm')

            let fpEndTime = moment(fpStartTime, 'HH:mm:ss')
              .add(1, 'h')
              .format('H:mm')
            if (fpEndTime > moment(endTime, 'HH:mm:ss')) {
              fpEndTime = moment(endTime, 'HH:mm:ss').format('H:mm')
            }
            item.fpEndTime = fpEndTime
          }
        }

        if (waitList && waitList.length > 0) {
          const [utime, postedWaitMinutes, status] = item.waitList[0]
          item.status = status
          item.utime = utime
          item.postedWaitMinutes = postedWaitMinutes
        }
        waits[item.id] = item
      })

      state.attsWait = waits
      state.loading.attsWait = false
    },

    SET_PARK_LIST: (state, data) => {
      state.parkList = data
    },
    SET_PARKS: (state, data) => {
      data.forEach(item => {
        const { date } = item
        state.parks[date] = item
      })
    },
    SET_TICKET_LIST: (state, data) => {
      state.ticketList = data
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
    // 获取等待时间
    async getAttractionsWait({ commit, state }, date) {
      state.loading.attsWait = true
      const data = await Wait.attractions(state.local, date)
      setTimeout(() => {
        commit('SET_ATTS_WAIT', data)
      }, 300)
    },

    // 获取乐园统计列表
    async getParkCountList({ commit, state }, arg) {
      const { local } = state
      const data = await Wait.parkCount(local, arg)
      data.forEach(item => {
        const { flowMax } = item
        item.flowIn = Math.round(flowMax * 0.9)
      })
      data.reverse()
      commit('SET_PARK_LIST', data)
      // commit('SET_PARKS', data)
    }
  }
}

export default count
