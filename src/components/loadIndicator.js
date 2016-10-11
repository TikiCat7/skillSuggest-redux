import React, { Component } from 'react'
import CircularProgress from 'material-ui/CircularProgress'

class LoadingIndicator extends React.Component {
  render() {
    return(
      <div>
        <h1>Loading...</h1>
        <CircularProgress size={2}
        />
      </div>
    )
  }
}

export default LoadingIndicator
