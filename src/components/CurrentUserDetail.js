import React, { Component } from 'react'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

class CurrentUserDetail extends Component {

  calculateSkillsVotes(currentUserData) {
    const skills2 = currentUserData.skills.toJS()
    const unique = [...new Set(skills2.map(skill => skill.name))]

    const finalSkills = unique.map(uniqueSkill => {
      let count = 0;
      let voters = [];
      for(let i =0; i<skills2.length; i++) {
        if(skills2[i].name == uniqueSkill) {
          count++;
          let voter = {name:skills2[i].assignee_name, id:skills2[i].assignee_id}
          voters.push(voter)
        }
      }
      let result = {skillName:uniqueSkill, voteCount:count,voters:voters}
      return result
    })

    function compare(a,b) {
      if (a.voteCount < b.voteCount)
      //console.log("here")
        return 1;
      if (a.voteCount > b.voteCount)
        return -1;
      return 0;
    }

    const ordered = finalSkills.sort(compare);
    return ordered
  }

  render() {
    const { currentUserData } = this.props
    const userSkills = this.calculateSkillsVotes(currentUserData)
    console.log(userSkills)

    const styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    }

    function handleRequestDelete() {
      console.log("chip was pressed")
    }

    const userSkillsWithVotes = userSkills.map((skill) => {
      return(
        <Chip
          style={styles.chip}
          key={skill.skillName}
        >
          <Avatar size={32}>{skill.voteCount}</Avatar>
          {skill.skillName}
        </Chip>
          )
    })

    // const skills = currentUserData.skills.map((skill)=> {
    //   return(
    //     <ul key={skill.id}>
    //       <Chip
    //         style={styles.chip}
    //         onRequestDelete={handleRequestDelete}
    //       >
    //         {skill.name}
    //       </Chip>
    //       <li>
    //         Skill Name: {skill.name}
    //       </li>
    //       <li>
    //         Skill Assigned By: {skill.assignee_name}
    //       </li>
    //     </ul>
    //   )
    // })

    return(
      <div>
        <ul>
          UserID: {currentUserData.id}
          <li>Name: {currentUserData.name}</li>
          <li>Job: {currentUserData.job}</li>
          <li>Age: {currentUserData.age}</li>
        </ul>
        Assigned Skills:
        {userSkillsWithVotes}
        <RaisedButton
          containerElement={<Link to="/main" />}
          label="back"/>
      </div>
    )
  }
}

export default CurrentUserDetail
