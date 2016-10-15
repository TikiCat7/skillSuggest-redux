import { List, Record } from 'immutable'

import Skill from './Skill'
import User from './User'

const _Skills = Record({
  skillName: '',
  count: null,
  skills: new List(), // Immutable list of skills objects which are also immutable
})

export default class Skills extends _Skills {
  static fromJS(listOfSkills = {}) {

    let skills = new List()
    // map over skills array and create List of Skill objects
    if (listOfSkills.length > 0) {
           skills = new List(listOfSkills.map((skill) => {
            return Skill.fromJS(skill)
          }))
      }

    return (new this).merge({
      skillName: listOfSkills[0].name,
      count: listOfSkills.length,
      skills  // save List in User objects
    })
  }
}
