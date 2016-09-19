import React, { Component } from 'react'
import { Link } from 'react-router'

class CurrentUserDetail extends Component {
  
  render() {
    const { currentUserData } = this.props
    const skills = currentUserData.skills.map((skill)=> {
      return(
        <ul key={skill.id}>
          <li>
            Skill Name: {skill.name}
          </li>
          <li>
            Skill Assigned By: {skill.assignee_name}
          </li>
        </ul>
      )
    })
    return(
      <div>
        <Link to={`/`}>Return</Link>
        <ul>
          UserID: {currentUserData.id}
          <li>Name: {currentUserData.name}</li>
          <li>Job: {currentUserData.Job}</li>
          <li>Age: {currentUserData.age}</li>
        </ul>
        {skills}
      </div>
    )
  }
}

export default CurrentUserDetail
