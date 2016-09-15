import React, { Component } from 'react'

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
              <li>{skill.name}</li>
            )
          })
          return(
          <ul key={user.id}> {user.name}
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
