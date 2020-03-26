import React from 'react'
import PropTypes from 'prop-types'

import DefaultPreview from 'part:@sanity/components/previews/default'
import { Item } from 'part:@sanity/components/lists/default'
import Moment from 'react-moment'

import { Icon, InlineIcon } from '@iconify/react'
import orangeCircle from '@iconify/icons-twemoji/orange-circle'

import styles from './Now.css'

import CoreWidget from './CoreWidget'

class DashboardWidget extends React.Component {
  render() {
    const { deployment } = this.props
    return (
      <>
        {deployment && (
          <Item key={deployment.id} className={styles.item}>
            <Moment unix>{deployment.createdAt / 1000}</Moment>
            <DefaultPreview
              title={deployment.state}
              subtitle={deployment.id}
              media=<Icon icon={orangeCircle} />
            />
          </Item>
        )}
      </>
    )
  }
}

export default DashboardWidget
