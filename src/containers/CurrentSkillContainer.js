import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

//actions
import { getCurrentSkill, clearCurrentSkill } from '../actions/user'
//components
import CurrentSkillDetail from '../components/currentSkillDetail'
import AllSkillDetail from '../components/allSkillDetail'

class CurrentSkillContainer extends React.Component {

  componentDidMount() {
    this.init()
  }

  init() {
    console.log(`go get ${this.props.params.name}`)
    this.props.getCurrentSkill(this.props.params.name)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.params.name == undefined && this.props.params.name) {
      const {dispatch, params} = nextProps;
        this.props.getCurrentSkill()
    }
  }

  componentWillUnmount() {
    this.props.clearCurrentSkill()
  }

  render() {
    return(
      <div>
        {this.props.params.name == undefined ?
          <AllSkillDetail isFetching={this.props.isFetching}
            skills={this.props.currentSkill} />
              : <CurrentSkillDetail isFetching={this.props.isFetching}
                skills={this.props.currentSkill} />}
      </div>
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
    getCurrentSkill,
    clearCurrentSkill
  }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(CurrentSkillContainer)
