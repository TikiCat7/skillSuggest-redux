import React, { Component, PropTypes } from 'react'

class CurrentSkillDetail extends React.Component {
    render() {
      const { isFetching, skills } = this.props
      const mapped = skills.skills.map(skill => {
        return(
          <li key={skill.id}>{skill.assignee_name}</li>
        )
      })
      const styles = {
        topDiv: {
          paddingTop: 80,
          textAlign: 'center'
        }
      }
      return (
        <div style={styles.topDiv}>
          <div>Skill Name: {skills.skillName}</div>
          <div>Skill Count: {skills.count}</div>
          <ul> Users who have {skills.skillName} assigned to:
            {mapped}
          </ul>
        </div>
    )
    }
}
export default CurrentSkillDetail
