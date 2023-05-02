export interface RauStateInterface {
  prop: boolean
  users: any
  expenses: any
}

function state(): RauStateInterface {
  return {
    prop: false,
    users: [],
    expenses: [],
  }
}

export default state
