import { Module } from 'vuex'
import { StateInterface } from '../index'
import state, { RauStateInterface } from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const rauModule: Module<RauStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
}

export default rauModule
