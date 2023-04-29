export interface StateInterface {
  prop: boolean
  users: any
}

function state(): StateInterface {
  return {
    prop: false,
    users: [],
  }
}

export default state
