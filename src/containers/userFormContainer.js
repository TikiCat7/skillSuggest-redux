import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import UserForm from '../components/UserForm'

class UserFormContainer extends React.Component {

  handleSubmit(values) {
    console.log(values)
  }

  render() {
    return(
      <UserForm onSubmit={this.handleSubmit}/>
    )
  }
}

const mapStateToProps = (state) => {

}

const mapDispatchToProps = (dispatch) => {

}

export default connect()(UserFormContainer)
