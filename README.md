# Sanity Dashboard Widget: Now.sh

Sanity Studio Dashboard Widget for triggering Now.sh deployments.

## Installing

### Install the dashboard plugin

To get dashboard support in Sanity Studio in general:

`sanity install @sanity/dashboard`

### Install the Now.sh widget plugin

`sanity install sanity-plugin-dashboard-widget-now`

## Configuring

1. Implement your own dashboardConfig. In your `sanity.json` file, append the following line to the `parts` array:

```json
{
  "implements": "part:@sanity/dashboard/config",
  "path": "src/dashboardConfig.js"
}
```

2. Create the file `src/dashboardConfig.js` and include the `now` widget config like this:

```js
export default {
  widgets: [
    {
      name: 'now',
      options: {
        nowConfig: {
          // https://zeit.co/account/tokens
          token: '___TOKEN___', 
          // https://zeit.co/docs/v2/more/deploy-hooks
          deployHook: '___DEPLOY_HOOK___',
          // https://zeit.co/docs/api?query=tokens#endpoints/teams/list-all-your-teams
          teamId: '___TEAM_ID___',
          // https://zeit.co/docs/api?query=tokens#endpoints/projects/get-all-projects
          projectId: '___PROJETC_ID___'
        }
      }
    }
  ]
}
```

### Widget options

- `token` -  These tokens allow other apps to control your whole account. Be careful!
- `deployHook` -  Deploy Hooks allow you to create URLs that accept HTTP POST requests in order to trigger deployments and re-run the Build Step (https://zeit.co/docs/v2/build-step).
- `teamId` -  List deployments of the team matching the specified `teamId`. You can get `teamId` by using the teams endpoint (https://zeit.co/docs/api?query=tokens#endpoints/teams/list-all-your-teams) and obtaining the id of a team.
- `projectId` -  Filter deployments from the given `projectId`.
