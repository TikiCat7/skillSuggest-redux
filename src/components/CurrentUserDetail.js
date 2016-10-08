import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import SkillPostBox from '../components/skillPostBox'

import RaisedButton from 'material-ui/RaisedButton'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import Snackbar from 'material-ui/Snackbar'

import CSSModules from 'react-css-modules'
import styles from './CurrentUserDetail.scss'

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

  handleRequestClose() {
    this.props.handleLogInMessage()

  }

  render() {
    //　console.log(this.context)
    const { currentUserData, logInInfo, disableLogInMessage } = this.props
    const userSkills = this.calculateSkillsVotes(currentUserData)
    //console.log(userSkills)

    const styles = {
      chip: {
        margin: 10,
        display: "inline-block"
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
      const voters = skill.voters.map((voter) => {
        return(
          <li styleName="test" key={voter.id}>
            <Link to={`/user/${voter.id}`}>{voter.name}</Link>
          </li>
            )
            })
            return(
            <div styleName="skill">
              <Chip
                style={styles.chip}
                key={skill.skillName}
              >
                <Avatar size={32}>{skill.voteCount}</Avatar>
                {skill.skillName}
              </Chip>
              <ul styleName="voters">
                {voters}
              </ul>
            </div>
            )
            })

        return(
        <div styleName="container">
          <ul >
            UserID: {currentUserData.id}
            <li>Name: {currentUserData.name}</li>
            <li>Job: {currentUserData.job}</li>
            <li>Age: {currentUserData.age}</li>
          </ul>
          <div styleName="skillsSection">
            Assigned Skills:
            {userSkillsWithVotes}
          </div>
          <SkillPostBox onSubmit={this.props.onSubmit} showAuthError={this.props.showAuthError} handleLogIn={this.props.handleLogIn} handleCancel={this.props.handleCancel}/>
          <div>
            <RaisedButton
              styleName="backButton"
              containerElement={<Link to="/main" />}
              label="back"/>
          </div>
          <Snackbar
            open={logInInfo.logInInfo}
            message={`Logged in as ${logInInfo.name}!`}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose.bind(this)}
          />
        </div>
        )
      }
    }

export default CSSModules(CurrentUserDetail, styles)
