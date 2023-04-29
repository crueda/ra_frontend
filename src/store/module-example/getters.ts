import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { ExampleStateInterface } from './state'

const getters: GetterTree<ExampleStateInterface, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
  getUsers(context) {
    return context.users
  },
}

export default getters
