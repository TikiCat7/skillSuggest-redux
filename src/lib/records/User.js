import { List, Record } from 'immutable'

import Skill from './Skill'

const _User = Record({
  id: null,
  name: '',
  job: '',
  age: null,
  skills: new List(), // Immutable list of skills objects which are also immutable
})

export default class User extends _User {
  static fromJS(user = {}) {

    // map over skills array and create List of Skill objects
    if (user.skills) {
          skills = new List(user.skills.map((skill) => {
            return Skill.fromJS(skill)
          }))
        }

    return (new this).merge({
      id: parseInt(user.id),
      name: user.name,
      job: user.job,
      age: parseInt(user.age),
      skills  // save List in User objects
    })
  }
}
