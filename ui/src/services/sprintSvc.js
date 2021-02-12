import axios from 'axios'

export default {

  listSprint () {
    return axios.get('/api/sprints')
  },

  getSprint (sprintId) {
    return axios.get('/api/sprint/' + sprintId)
  },

  deleteSprint (sprintId) {
    return axios.delete('/api/sprint/' + sprintId)
  },

  activeSprint (sprintId, sprintStatus) {
    return axios.put(`api/sprint/${sprintId}/status`, {
      status: sprintStatus
    })
  },
  // {
  //   if (sprintStatus === 'active') {
  //     return axios.put('/api/sprint/' + sprintId + '/active')
  //   } else {
  //     return axios.put('/api/sprint/' + sprintId + '/disable')
  //   }
  // },
  addSprint (sprintData) {
    // var _data = {
    //   project_id: sprintData.project_id,
    //   name: sprintData.name,
    //   version: sprintData.version,
    //   requirements: sprintData.requirements,
    //   rcs: sprintData.rcs,
    //   issue: {
    //     types: sprintData.issue.types,
    //     found_since: sprintData.issue.found_since,
    //     statuses: {
    //       fixing: sprintData.issue.statuses.fixing,
    //       fixed: sprintData.issue.statuses.fixed,
    //       verified: sprintData.issue.statuses.verified
    //     },
    //     categories: sprintData.issue.categories
    //   },
    //   case: {}
    // }
    var _data = {
      name: sprintData.name,
      project_id: sprintData.project_id,
      case_config: {},
      issue_config: {
        category: {
          field: sprintData.issue_config.category.field,
          newfeature: sprintData.issue_config.category.newfeature,
          previous: sprintData.issue_config.category.previous,
          regression: sprintData.issue_config.category.regression
        },
        rc: {
          field: sprintData.issue_config.rc.field,
          value: sprintData.issue_config.rc.value
        },
        requirement: {
          field: sprintData.issue_config.requirement.field,
          value: sprintData.issue_config.requirement.value
        },
        since: {
          field: sprintData.issue_config.since.field,
          customer: sprintData.issue_config.since.customer,
          improve: sprintData.issue_config.since.improve,
          newfeature: sprintData.issue_config.since.newfeature,
          qamissed: sprintData.issue_config.since.qamissed
        },
        sprint: {
          field: sprintData.issue_config.sprint.field,
          value: sprintData.issue_config.sprint.value
        },
        status: {
          field: sprintData.issue_config.status.field,
          fixed: sprintData.issue_config.status.fixed,
          fixing: sprintData.issue_config.status.fixing,
          verified: sprintData.issue_config.status.verified
        },
        type: {
          field: sprintData.issue_config.type.field,
          value: sprintData.issue_config.type.value
        },
        version: {
          field: sprintData.issue_config.version.field,
          value: sprintData.issue_config.version.value
        }
      }
    }
    return axios.post('/api/sprints', _data)
  },

  updateSprint (sprintData) {
    var _data = {
      name: sprintData.name,
      project_id: sprintData.project_id,
      case_config: {},
      issue_config: {
        category: {
          field: sprintData.issue_config.category.field,
          newfeature: sprintData.issue_config.category.newfeature,
          previous: sprintData.issue_config.category.previous,
          regression: sprintData.issue_config.category.regression
        },
        rc: {
          field: sprintData.issue_config.rc.field,
          value: sprintData.issue_config.rc.value
        },
        requirement: {
          field: sprintData.issue_config.requirement.field,
          value: sprintData.issue_config.requirement.value
        },
        since: {
          field: sprintData.issue_config.since.field,
          customer: sprintData.issue_config.since.customer,
          improve: sprintData.issue_config.since.improve,
          newfeature: sprintData.issue_config.since.newfeature,
          qamissed: sprintData.issue_config.since.qamissed
        },
        sprint: {
          field: sprintData.issue_config.sprint.field,
          value: sprintData.issue_config.sprint.value
        },
        status: {
          field: sprintData.issue_config.status.field,
          fixed: sprintData.issue_config.status.fixed,
          fixing: sprintData.issue_config.status.fixing,
          verified: sprintData.issue_config.status.verified
        },
        type: {
          field: sprintData.issue_config.type.field,
          value: sprintData.issue_config.type.value
        },
        version: {
          field: sprintData.issue_config.version.field,
          value: sprintData.issue_config.version.value
        }
      }
    }
    return axios.put('/api/sprint/' + sprintData.id, _data)
  }
}
