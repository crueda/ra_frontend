import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { RauStateInterface } from './state'

const actions: ActionTree<RauStateInterface, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
}

export default actions
