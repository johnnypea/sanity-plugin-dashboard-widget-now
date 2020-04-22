import React from 'react'

import DefaultPreview from 'part:@sanity/components/previews/default'
import { Item } from 'part:@sanity/components/lists/default'
import Button from 'part:@sanity/components/buttons/default'
import Moment from 'react-moment'

import { Icon } from '@iconify/react'
import greenCircle from '@iconify/icons-twemoji/green-circle'
import redCircle from '@iconify/icons-twemoji/red-circle'
import blackCircle from '@iconify/icons-twemoji/black-circle'
import orangeCircle from '@iconify/icons-twemoji/orange-circle'

import styles from './Now.css'

class DashboardWidget extends React.Component {
  render() {
    const { deployments } = this.props

    return (
      <>
        {deployments.map((deployment) => {
          const deployment_target = deployment.target || 'development'

          const statusIcon =
            (deployment.state == 'READY' && greenCircle) ||
            (deployment.state == 'ERROR' && redCircle) ||
            ((deployment.state == 'QUEUED' || deployment.state == 'BUILDING') && orangeCircle) ||
            blackCircle

          return (
            <Item key={deployment.uid} className={styles.item}>
              <Moment unix>{deployment.created / 1000}</Moment>
              <DefaultPreview
                title={`[${deployment.state}] - ${deployment_target}`}
                subtitle={deployment.url}
                media=<Icon icon={statusIcon} />
              />
            </Item>
          )
        })}
      </>
    )
  }
}

export default DashboardWidget
