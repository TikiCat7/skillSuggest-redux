import React, { Component } from 'react'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'

//components
import LoadingIndicator from '../components/loadIndicator'

import _ from 'lodash'

class AllSkillData extends React.Component {
  render() {
    const styles = {
      topDiv: {
        paddingTop:80,
        textAlign:'center',
      },
      card : {
        width: '60%',
        marginTop: 20,
        display:'inline-block',
        padding: 20,
      }
    }
    const { isFetching, skills } = this.props
    const AllSkillsGraphData = skills.toJS()

    const result = _(AllSkillsGraphData.skills)
      .groupBy('name')
      .map((items, name) => ({ name, count: items.length }))
      .value();

    return(
      <div style={styles.topDiv}> {isFetching? <LoadingIndicator />:
        <div>
          <h1>All Skills Assigned</h1>
          <ResponsiveContainer width={'90%'} height={'50%'}>
            <BarChart data={result} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip/>
              <Bar dataKey="count" fill='#8884d8'/>
            </BarChart>
          </ResponsiveContainer>

        </div>
      }
      </div>
    )
  }
}

export default AllSkillData
