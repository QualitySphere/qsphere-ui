import axios from 'axios'

export default {

  listTracker () {
    return axios.get('/api/trackers')
  },

  addTracker (trackerData) {
    if (trackerData.type === 'jira') {
      var _data = {
        name: trackerData.name,
        type: trackerData.type,
        info: {
          host: trackerData.jira.host,
          account: trackerData.jira.account
        },
        token: trackerData.jira.password
      }
    }
    return axios.post('/api/trackers', _data)
  },

  deleteTracker (trackerId) {
    return axios.delete('/api/tracker/' + trackerId)
  },

  activeTracker (trackerId, trackerStatus) {
    return axios.put(`api/tracker/${trackerId}/status`, {
      status: trackerStatus
    })
    // if (trackerStatus === 'active') {
    //   return axios.put('/api/tracker/' + trackerId + '/active')
    // } else {
    //   return axios.put('/api/tracker/' + trackerId + '/disable')
    // }
  },

  getTracker (trackerId) {
    return axios.get('/api/tracker/' + trackerId)
  },

  updateTracker (trackerData) {
    if (trackerData.type === 'jira') {
      var _data = {
        name: trackerData.name,
        type: trackerData.type,
        info: {
          host: trackerData.jira.host,
          account: trackerData.jira.account
        },
        token: trackerData.jira.password
      }
    }
    return axios.put('/api/tracker/' + trackerData.id, _data)
  },

  listTrackerProject (trackerId) {
    return axios.get('/api/tracker/' + trackerId + '/projects')
  },

  listTrackerSprint (trackerId) {
    return axios.get('/api/tracker/' + trackerId + '/sprints')
  },

  listTrackerIssueField (trackerId) {
    return axios.get('/api/tracker/' + trackerId + '/issue_fields')
  },

  listTrackerIssueFieldValue (trackerId, projectId, fieldId) {
    return axios.get('/api/tracker/' + trackerId + '/issue_field', {
      params: {
        field: fieldId,
        project: projectId
      }
    })
  },

  listTrackerIssueType (trackerId) {
    return axios.get('/api/tracker/' + trackerId + '/issue_fields')
  },

  listTrackerIssueStatus (trackerId, fieldId) {
    return axios.get('/api/tracker/' + trackerId + '/issue_field', {
      params: {
        field: fieldId
      }
    })
  }
}
