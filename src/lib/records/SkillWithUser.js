import { Record, List } from 'immutable'

const _skillWithUser = Record({
  id: null,
  name: '',
  assignee_id: null,
  assignee_name: '',
  assigned_id: null,
  assigned_name: ''
})

export default class SkillWithUser extends _skillWithUser {
  static fromJS(skill = {}) {
    return (new this).merge({
      id: parseInt(skill.id),
      name: skill.name,
      assignee_id: skill.assignee_id,
      assignee_name: skill.assignee_name,
      assigned_id: skill.user.id,
      assigned_name: skill.user.name
    })
  }

  // can add helper functinos in model definition
  isValidName() {
    return this.name.length > 0
  }
}
