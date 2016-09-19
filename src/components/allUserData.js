import React, { Component } from 'react'
import { Link } from 'react-router'

class AllUserData extends Component {
  render() {
    const { allUserData } = this.props
    //console.log(allUserData)
    return(
      <div>
        <div>All the user data from http://localhost:3000/api/users</div>
        {allUserData.map((user)=> {
          const skill = user.skills.map((skill)=> {
            return(
              <li key={skill.id}>{skill.name}</li>
            )
          })
          return(
          <ul key={user.id}>
            <Link to={`/user/${user.id}`}>{user.name}</Link>
            <li>{user.age}</li>
            <li>{user.job}</li>
            {skill}
          </ul>
          )
        })}
      </div>
        )
  }
}

export default AllUserData
