import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import { Link } from 'react-router'

//components
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import LoadingIndicator from '../components/loadIndicator'

class CurrentSkillDetail extends React.Component {
    render() {
      const { isFetching, skills } = this.props
      const styles = {
        topDiv: {
          paddingTop: 80,
          textAlign: 'center'
        },
        card: {
          listStyleType: 'none',
          paddingTop: 15,
          paddingBottom: 15,
          marginBottom:15,
          marginTop:15
        },
        topCard: {
          width: '60%',
          textAlign: 'center',
          display: 'inline-block',
          paddingTop: 15,
          paddingBottom: 15
        },
        ul: {
          textAlign: 'center',
          display: 'inline-block',
          width: '45%',
          paddingLeft:0
        }
      }
      const skillData = skills.toJS()

      // need to figure this crap out
      const uniqueAsigned = _(skillData.skills)
         .groupBy('assigned_name', (skill) => {
           return skill
         }).map((skills) => {
           return {
            name: skills[0].assigned_name, id: skills[0].assigned_id
           }
         })
         .value()
         .map((skill => {
           return(
             <Card style={styles.card}>
               <li key={skill.name}><Link to={`/user/${skill.id}`}>{skill.name}</Link></li>
             </Card>
           )
         }))

        // disgusting
        const uniqueAssignCount = _(skillData.skills)
           .groupBy('assigned_name', (skill) => {
             return skill
           }).map()
           .value().length

      return (
        <div style={styles.topDiv}> {isFetching? <LoadingIndicator /> :
          <div>
            <h1>Skill Detail</h1>
            <Card style={styles.topCard}>
              <div>Skill Name: {skillData.skillName}</div>
              <div>Total Assign Count: {skillData.count}</div>
              <div>Unique Assign Count: {uniqueAssignCount}</div>
            </Card>
            <ul style={styles.ul}> Users who have skill "{skillData.skillName}" assigned to:
              {uniqueAsigned}
            </ul>
          </div>}
          </div>
          )
    }
}
export default CurrentSkillDetail
