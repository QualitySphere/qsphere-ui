<template>
  <div style="width: 100%; height: 100%;">
    <el-row type="flex" style="height: 5%;">
    <el-form
      :inline="true"
      size="small"
      label-position="left">
      <!-- <el-form-item
        label="Tracker">
        <el-select
          @focus="listTracker"
          v-model="tracker.id"
          placeholder="Select Tracker">
          <el-option
            v-for="item in trackers"
            :key="item.id"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item
        v-if="$route.path === '/project'"
        label="Project"
        style="margin-left: 20px;">
        <el-select
          @focus="listProject"
          v-model="project.id"
          @change="updateUrlForProject"
          placeholder="Select Project">
          <el-option
            v-for="item in projects"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="$route.path === '/sprint'"
        label="Sprint"
        style="margin-left: 20px;">
        <el-select
          @focus="listSprint"
          v-model="sprint.id"
          @change="updateUrlForSprint"
          placeholder="Select Sprint">
          <el-option
            v-for="item in sprints"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="$route.path === '/sprint'"
        label="Requirement"
        style="margin-left: 20px;">
        <el-select
          @focus="listRequirement"
          v-model="req"
          @change="updateUrlForSprint"
          placeholder="Select Requirement">
          <el-option
            v-for="item in reqs"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        style="margin-left: 20px;">
        <el-tooltip
          class="item"
          effect="dark"
          content="Full Screen"
          placement="right">
          <el-link
            icon="el-icon-full-screen"
            :underline="false"
            style="font-size: 1.25em;"
            hover="adadedeik"
            @click="fullScreen">
          </el-link>
        </el-tooltip>
      </el-form-item>
    </el-form>
    </el-row>
    <iframe
      frameborder="0"
      sandbox="allow-scripts allow-same-origin"
      :src="url"
      style="width: 100%; height: 95%;">
    </iframe>
  </div>
</template>

<script>
import trackerSvc from '@/services/trackerSvc'
import projectSvc from '@/services/projectSvc'
import sprintSvc from '@/services/sprintSvc'
export default {
  data () {
    return {
      overviewBaseUrl: '/board/d/qsphere-overview/qsphere-overview?orgId=1&kiosk&refresh=1m',
      overviewInitUrl: '/board/d/qsphere-overview/qsphere-overview?orgId=1&theme=light&kiosk&refresh=1m',
      projectBaseUrl: '/board/d/qsphere-project/qsphere-project?orgId=1&kiosk&refresh=1m',
      projectInitUrl: '/board/d/qsphere-project/qsphere-project?orgId=1&theme=light&kiosk&refresh=1m',
      sprintBaseUrl: '/board/d/qsphere-sprint/qsphere-sprint?orgId=1&kiosk&refresh=1m',
      sprintInitUrl: '/board/d/qsphere-sprint/qsphere-sprint?orgId=1&theme=light&kiosk&refresh=1m',
      url: '/board/d/qsphere-overview/qsphere-overview?orgId=1&theme=light&kiosk&refresh=1m',
      theme: 'light',
      trackers: [],
      tracker: {
        id: '',
        name: ''
      },
      projects: [],
      project: {
        id: '',
        name: ''
      },
      sprints: [],
      sprint: {
        id: '',
        name: ''
      },
      reqs: [],
      req: '',
      from_time: '',
      to_time: ''
    }
  },
  methods: {
    updateUrlForOverview () {
      console.log('Origin URL: ' + this.url)
      // this.project.id = ''
      // this.project.name = ''
      // this.sprint.id = ''
      // this.sprint.name = ''
      // this.from_time = ''
      // this.to_time = 'now'
      // this.url = this.overviewBaseUrl + '&from=' + this.from_time + '&to=' + this.to_time
      this.url = this.overviewBaseUrl + '&to=now'
      console.log('Change URL to ' + this.url)
    },
    updateUrlForProject () {
      // this.sprint.id = ''
      // this.sprint.name = ''
      // this.from_time = ''
      // this.to_time = 'now'
      // for (var p in this.projects) {
      //   console.log(this.projects[p])
      //   if (this.projects[p].name === this.project.name) {
      //     this.project.id = this.project[p].id
      //     break
      //   }
      // }
      console.log('Origin URL: ' + this.url)
      projectSvc.getProject(this.project.id)
        .then((response) => {
          console.log(response)
          // this.url = this.projectBaseUrl + '&theme=' + this.theme + '&var-project=' + this.project.id + '&from=' + this.from_time + '&to=' + this.to_time
          this.url = this.projectBaseUrl + '&theme=' + this.theme + '&var-project=' + this.project.id + '&to=now'
          console.log('Change URL to ' + this.url)
        })
        .catch((error) => {
          this.$message.error(error)
        })
    },
    updateUrlForSprint () {
      // for (var s in this.sprints) {
      //   console.log(this.sprints[s])
      //   if (this.sprints[s].name === this.sprint.name) {
      //     this.sprint.id = this.sprints[s].id
      //     break
      //   }
      // }
      console.log('Origin URL: ' + this.url)
      sprintSvc.getSprint(this.sprint.id)
        .then((response) => {
          console.log(response)
          this.from_time = response.data.detail.capture_history.start_time * 1000
          if (response.data.detail.status === 'active') {
            this.to_time = 'now'
          } else {
            this.to_time = response.data.detail.capture_history.end_time * 1000
          }
          this.project.id = response.data.detail.project_id
          this.url = this.sprintBaseUrl + '&theme=' + this.theme + '&var-project=' + this.project.id + '&var-sprint=' + this.sprint.id + '&var-requirement=' + this.req + '&from=' + this.from_time + '&to=' + this.to_time
          console.log('Change URL to ' + this.url)
        })
        .catch((error) => {
          this.$message.error(error)
        })
    },
    listTracker () {
      trackerSvc.listTracker()
        .then((response) => {
          console.log(response)
          this.trackers = response.data.detail.results
        })
        .catch((error) => {
          this.$message.error(String(error))
        })
    },
    listProject () {
      projectSvc.listProject()
        .then((response) => {
          console.log(response)
          this.projects = response.data.detail.results
        })
        .catch((error) => {
          this.$message.error(String(error))
        })
    },
    listSprint () {
      sprintSvc.listSprint()
        .then((response) => {
          console.log(response)
          this.sprints = response.data.detail.results
        })
        .catch((error) => {
          this.$message.error(String(error))
        })
    },
    listRequirement () {
      if (this.sprint.id) {
        sprintSvc.getSprint(this.sprint.id)
          .then((response) => {
            console.log(response)
            this.reqs = response.data.detail.issue_config.requirement.value
          })
          .catch((error) => {
            this.$message.error(String(error))
          })
      } else {
        this.reqs = []
      }
    },
    fullScreen () {
      var fullScreenUrl = this.url
      window.open(fullScreenUrl.replace(/theme=light/, 'theme=dark'))
    }
  },
  watch: {
    $route (to, from) {
      if (to.path === '/overview') {
        this.url = this.overviewInitUrl
        console.log('Change URL to ' + this.url)
      }
      if (to.path === '/project') {
        if (this.project.id) {
          this.url = this.projectBaseUrl + '&theme=' + this.theme + '&var-project=' + this.project.id + '&to=now'
        } else {
          this.url = this.projectInitUrl
        }
        console.log('Change URL to ' + this.url)
      };
      if (to.path === '/sprint') {
        if (this.sprint.id) {
          this.url = this.sprintBaseUrl + '&theme=' + this.theme + '&var-project=' + this.project.id + '&var-sprint=' + this.sprint.id + '&var-requirement=' + this.req + '&from=' + this.from_time + '&to=' + this.to_time
        } else {
          this.url = this.sprintInitUrl
        }
        console.log('Change URL to ' + this.url)
      }
    }
  }
}
</script>
