import User from '../lib/records/User'

export default function addUser(addedUser, skillApp) {
  console.log('added user'+ addedUser)

  const previousUsers = skillApp
  const immutableUser = User.fromJS(addedUser)

  console.log(immutableUser)

  const users = previousUsers.push(immutableUser)

  console.log('prevoiusUsers + addedUser' + users)
    return {
      type:'ADD_USER',
      users
    }
}
