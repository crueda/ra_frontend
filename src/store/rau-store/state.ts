export interface RauStateInterface {
  prop: boolean
  users: any
}

function state(): RauStateInterface {
  return {
    prop: false,
    users: [],
  }
}

export default state
