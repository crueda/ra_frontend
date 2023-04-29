import { MutationTree } from 'vuex'
import { RauStateInterface } from './state'

const mutation: MutationTree<RauStateInterface> = {
  setUsers(state: RauStateInterface, data) {
    state.users = data
  },
}

export default mutation
