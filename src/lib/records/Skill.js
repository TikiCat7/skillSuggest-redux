import { Record, List } from 'immutable'

const _skill = Record({
  id: null,
  name: '',
  assignee_id: null,
  assignee_name: ''
})

export default class Skill extends _skill {
  static fromJS(skill = {}) {
    return (new this).merge({
      id: parseInt(skill.id),
      name: skill.name
      assignee_id: skill.assignee_id
      assignee_name: skill.assignee_name
    })
  }
}
