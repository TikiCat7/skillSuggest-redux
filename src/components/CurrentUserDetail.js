import React, { Component } from 'react'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';

class CurrentUserDetail extends Component {

  render() {
    const { currentUserData } = this.props
    const styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    };
    function handleRequestDelete() {
      console.log("chip was pressed")
    }
    const skills = currentUserData.skills.map((skill)=> {
      return(
        <ul key={skill.id}>
          <Chip
            style={styles.chip}
            onRequestDelete={handleRequestDelete}
          >
            {skill.name}
          </Chip>
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
        <ul>
          UserID: {currentUserData.id}
          <li>Name: {currentUserData.name}</li>
          <li>Job: {currentUserData.job}</li>
          <li>Age: {currentUserData.age}</li>
        </ul>
        Assigned Skills:
        {skills}
        <RaisedButton
          containerElement={<Link to="/main" />}
          label="back"/>
      </div>
    )
  }
}

export default CurrentUserDetail
