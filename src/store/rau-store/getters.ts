import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { RauStateInterface } from './state'

const getters: GetterTree<RauStateInterface, StateInterface> = {
  getUsers(context) {
    return context.users
  },
  getExpenses(context) {
    return context.expenses
  },
}

export default getters
