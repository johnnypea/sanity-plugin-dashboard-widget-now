import React from 'react'
import PropTypes from 'prop-types'

import styles from './Now.css'

import CoreWidget from './CoreWidget'

class DashboardWidget extends React.Component {
  render() {
    const { nowConfig, title } = this.props
    return (
      <div className={styles.container}>
        {nowConfig ? (
          <>
            <header className={styles.header}>
              <h3 className={styles.title}>{title || 'Now.sh deployments'}</h3>
            </header>
            <div>
              <CoreWidget config={nowConfig} />
            </div>
          </>
        ) : (
          <p>
            Use <code>nowConfig</code> to config your google analytics widget
          </p>
        )}
      </div>
    )
  }
}

export default DashboardWidget
