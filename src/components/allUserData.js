import React, { Component } from 'react'
import { Link } from 'react-router'

import LoadingIndicator from '../components/loadIndicator'

class AllUserData extends Component {

  render() {
    const { allUserData, isFetching } = this.props
    const styles = {
        textAlign: 'center',
        paddingTop: 80
    }

    return(
      <div style={styles}>
        {isFetching? <LoadingIndicator /> :
          <div>
            <div>All the user data from https://skill-suggest-api.herokuapp.com/api/users/</div>
            {allUserData.map((user)=> {
              return(
                <ul key={user.id}>
                  <Link to={`/user/${user.id}`}>{user.name}</Link>
                </ul>
              )
            })}
          </div>}
      </div>
        )
  }
}

export default AllUserData
