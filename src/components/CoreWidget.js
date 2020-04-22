import React from 'react'

import { List } from 'part:@sanity/components/lists/default'
import Spinner from 'part:@sanity/components/loading/spinner'
import Button from 'part:@sanity/components/buttons/default'

import styles from './Now.css'

// import CurrentDeployment from './CurrentDeployment'
import Deployments from './Deployments'

class CoreWidget extends React.Component {
  _interval = undefined

  constructor(props) {
    super(props)
    this.config = props.config
  }

  state = {
    deploymentStatus: null,
    currentDeployment: null,
    deployments: null,
    deploying: null,
    hasDeployments: false,
    error: null,
  }

  deployNow = () => {
    const requestOptions = {
      method: 'POST',
    }

    //direct Gitlab deploy
    fetch(this.config.deployHook, requestOptions)
      .then(async (response) => {
        const data = await response.json()

        this.setState({ deploymentStatus: true })
      })
      .then(() => {
        this.setState({ deploying: true })
        this.checkDeployments()
      })

    // fetch(this.config.deployHook, requestOptions)
    //   .then(async (response) => {
    //     const data = await response.json()

    //     // // check for error response
    //     // if (!response.ok) {
    //     //     // get error message from body or default to response status
    //     //     const error = (data && data.message) || response.status;
    //     //     return Promise.reject(error);
    //     // }

    //     this.setState({ deploymentStatus: data.job })
    //   })
    //   .catch((error) => {
    //     this.setState({ error: error })
    //     console.error('There was an error!', error)
    //   })
    //   .then(() => {
    //     this.setState({ deploying: true })
    //     this.checkDeployments()
    //   })
  }

  getDeployment = () => {
    this.getDeployments()
  }

  getDeployments = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.config.token,
      },
    }

    fetch(
      'https://api.vercel.com/v6/now/deployments?teamId=' +
        this.config.teamId +
        '&projectId=' +
        this.config.projectId +
        '&limit=5',
      requestOptions
    )
      .then(async (response) => {
        const data = await response.json()
        // // check for error response
        // if (!response.ok) {
        //     // get error message from body or default to response status
        //     const error = (data && data.message) || response.status;
        //     return Promise.reject(error);
        // }
        this.setState({ deployments: data.deployments })
      })
      .catch((error) => {
        this.setState({ error: error })
        console.error('There was an error!', error)
      })
      .then(() => {
        this.isDeploying()
      })
  }

  checkDeployments = () => {
    if (typeof this._interval === 'undefined') {
      this._interval = setInterval(this.getDeployments, 60000)
    }
  }

  isDeploying = () => {
    let currentState = false
    this.state.deployments.some((deployment) => {
      if (deployment.state === 'QUEUED' || deployment.state === 'BUILDING') {
        this.setState({ currentDeployment: deployment.uid })
        currentState = true
        return true
      }
    })

    if (this.state.deploymentStatus && currentState) {
      this.setState({ deploymentStatus: null })
    }

    if (currentState || this.state.deploymentStatus) {
      this.setState({ deploying: true })
      this.checkDeployments()
    } else {
      this.setState({ deploying: false })
      this._interval = clearInterval(this._interval)
    }
  }

  componentDidMount() {
    this.getDeployments()
  }

  render() {
    const { deploymentStatus, deployments, deploying, error } = this.state
    const isLoading = !deployments
    const isDeploying = deploying

    if (error) {
      return <pre>{JSON.stringify(error, null, 2)}</pre>
    }

    return (
      <>
        {isLoading && (
          <List className={styles.list}>
            <Spinner center message="Loading items…" />
          </List>
        )}

        {!isLoading && (
          <List className={styles.list}>
            <Deployments deployments={this.state.deployments} />
          </List>
        )}

        <div className={styles.footer}>
          {(isDeploying && (
            <Button bleed color="primary" kind="add" onClick={this.getDeployment}>
              Refresh
            </Button>
          )) || (
            <Button bleed color="primary" kind="simple" onClick={this.deployNow}>
              Build & deploy
            </Button>
          )}         
        </div>
      </>
    )
  }
}

export default CoreWidget
