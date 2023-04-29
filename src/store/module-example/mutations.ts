import { MutationTree } from 'vuex'
import { ExampleStateInterface } from './state'

const mutation: MutationTree<ExampleStateInterface> = {
  someMutation(/* state: ExampleStateInterface */) {
    // your code
  },
  setUsers(state: ExampleStateInterface, data) {
    state.users = data
  },
}

export default mutation
