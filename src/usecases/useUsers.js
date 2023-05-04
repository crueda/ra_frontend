import useHttp from 'src/adapters/useHttp.js'

function UserException(message) {
  this.message = message
  this.name = 'UserException'
}

export default function () {
  const { get, post, put, remove } = useHttp()

  async function getUsers() {
    try {
      return await get('/users')
    } catch (err) {
      throw new UserException('Error in getUsers: ' + err)
    }
  }

  async function createUser(body) {
    try {
      await post('/user', body)
    } catch (err) {
      throw new UserException('Error in createUser: ' + err)
    }
  }

  async function updateUser(body) {
    try {
      await put('/user', body)
    } catch (err) {
      throw new UserException('Error in updateUser: ' + err)
    }
  }

  async function deleteUser(body) {
    try {
      console.log(body)
      await remove('/user', body)
    } catch (err) {
      throw new UserException('Error in deleteUser: ' + err)
    }
  }

  return {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
  }
}
