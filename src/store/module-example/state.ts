export interface ExampleStateInterface {
  prop: boolean
  users: any
}

function state(): ExampleStateInterface {
  return {
    prop: false,
    users: [],
  }
}

export default state
