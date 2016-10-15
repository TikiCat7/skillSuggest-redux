import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

//actions
import { getCurrentSkill } from '../actions/user'
//components
import CurrentSkillDetail from '../components/currentSkillDetail'

class CurrentSkillContainer extends React.Component {

  componentDidMount() {
    this.init()
  }

  init() {
    console.log(`go get ${this.props.params.name}`)
    this.props.getCurrentSkill(this.props.params.name)
  }

  render() {
    return(
      // <currentSkillDetails />
      <CurrentSkillDetail isFetching={this.props.isFetching}
        skills={this.props.currentSkill}
      />
    )
  }
}

CurrentSkillContainer.contextTypes = {
  router: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentSkill: state.skillApp.currentSkill,
    isFetching: state.skillApp.isFetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getCurrentSkill
  }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(CurrentSkillContainer)
