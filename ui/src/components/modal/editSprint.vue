<template>
  <el-dialog title="Sprint" :visible.sync="dialogSprintVisible" :before-close="handleClose" width="60%">
      <el-form
      label-position="right"
      :border="true"
      label-width="120px"
      style="width: 100%;">
      <el-form-item label="Sprint Name">
          <el-input
          v-model="sprintDetail.name"
          placeholder="Input Sprint Name">
          </el-input>
      </el-form-item>
      <el-form-item label="Project">
          <el-select
          v-model="sprintDetail.project_id"
          filterable
          clearable
          placeholder="Select Project"
          style="width: 100%;">
          <el-option
              v-for="item in projects"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
          </el-select>
      </el-form-item>
      <br>
      <el-divider>Issue Configuration</el-divider>
     <el-form-item label="Sprint">
          <el-col :span="4">
          <el-select
              v-model="sprintDetail.issue_config.sprint.field"
              filterable
              clearable
              placeholder="Field"
              @change="getTrackerFieldValue(sprintDetail.issue_config.sprint.field)"
              style="width: 100%;">
              <el-option
              v-for="item in fieldDetail"
              :key="item.key"
              :label="item.value"
              :value="item.key">
              </el-option>
          </el-select>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="18">
          <el-select
              v-model="sprintDetail.issue_config.sprint.value"
              multiple
              filterable
              clearable
              allow-create
              placeholder="Value"
              style="width: 100%;">
              <el-option
              v-for="item in fieldValueDetail[sprintDetail.issue_config.sprint.field]"
              :key="item.key"
              :label="item.value"
              :value="item.key">
              </el-option>
          </el-select>
          </el-col>
      </el-form-item>

      <el-form-item label="Requirement">
          <el-col :span="4">
          <el-select
              v-model="sprintDetail.issue_config.requirement.field"
              filterable
              clearable
              @change="getTrackerFieldValue(sprintDetail.issue_config.requirement.field)"
              placeholder="Field"
              style="width: 100%;">
              <el-option
              v-for="item in fieldDetail"
              :key="item.key"
              :label="item.value"
              :value="item.key">
              </el-option>
          </el-select>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="18">
          <el-select
              v-model="sprintDetail.issue_config.requirement.value"
              multiple
              filterable
              clearable
              allow-create
              placeholder="Value(s)"
              style="width: 100%;">
              <el-option
              v-for="item in fieldValueDetail[sprintDetail.issue_config.requirement.field]"
              :key="item.key"
              :label="item.value"
              :value="item.key">
              </el-option>
          </el-select>
          </el-col>
      </el-form-item>
       <el-form-item label="Found In Version">
          <el-col :span="4">
          <el-select
              v-model="sprintDetail.issue_config.version.field"
              filterable
              clearable
              @change="getTrackerFieldValue(sprintDetail.issue_config.version.field)"
              placeholder="Field"
              style="width: 100%;">
              <el-option
              v-for="item in fieldDetail"
              :key="item.key"
              :label="item.value"
              :value="item.key">
              </el-option>
          </el-select>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="18">
          <el-select
              v-model="sprintDetail.issue_config.version.value"
              multiple
              filterable
              clearable
              allow-create
              placeholder="Value"
              style="width: 100%;">
              <el-option
              v-for="item in fieldValueDetail[sprintDetail.issue_config.version.field]"
              :key="item.key"
              :label="item.value"
              :value="item.key">
              </el-option>
          </el-select>
          </el-col>
      </el-form-item>
      <el-form-item label="Found In RC">
          <el-col :span="4">
          <el-select
              v-model="sprintDetail.issue_config.rc.field"
              filterable
              clearable
              @change="getTrackerFieldValue(sprintDetail.issue_config.rc.field)"
              placeholder="Field"
              style="width: 100%;">
              <el-option
              v-for="item in fieldDetail"
              :key="item.key"
              :label="item.value"
              :value="item.key">
              </el-option>
          </el-select>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="18">
          <el-select
              v-model="sprintDetail.issue_config.rc.value"
              multiple
              filterable
              clearable
              allow-create
              placeholder="Value(s)"
              style="width: 100%;">
              <el-option
              v-for="item in fieldValueDetail[sprintDetail.issue_config.rc.field]"
              :key="item.key"
              :label="item.value"
              :value="item.key">
              </el-option>
          </el-select>
          </el-col>
      </el-form-item>
      <el-form-item label="Issue Type">
          <el-col :span="4">
          <el-select
              v-model="sprintDetail.issue_config.type.field"
              clearable
              filterable
              @change="getTrackerFieldValue(sprintDetail.issue_config.type.field)"
              placeholder="Field"
              style="width: 100%;">
              <el-option
              v-for="item in fieldDetail"
              :key="item.key"
              :label="item.value"
              :value="item.key">
              </el-option>
          </el-select>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="18">
          <el-select
              v-model="sprintDetail.issue_config.type.value"
              multiple
              clearable
              filterable
              allow-create
              placeholder="Value(s)"
              style="width: 100%;">
              <el-option
              v-for="item in fieldValueDetail[sprintDetail.issue_config.type.field]"
              :key="item.key"
              :label="item.value"
              :value="item.key">
              </el-option>
          </el-select>
          </el-col>
      </el-form-item>

      <el-form-item label="Found Since">
          <el-col :span="4">
          <el-select
              v-model="sprintDetail.issue_config.since.field"
              clearable
              filterable
              @change="getTrackerFieldValue(sprintDetail.issue_config.since.field)"
              placeholder="Field"
              style="width: 100%;">
              <el-option
              v-for="item in fieldDetail"
              :key="item.key"
              :label="item.value"
              :value="item.key">
              </el-option>
          </el-select>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="5">
          <el-select
              v-model="sprintDetail.issue_config.since.newfeature"
              multiple
              clearable
              filterable
              allow-create
              default-first-option
              placeholder="NewFeature"
              style="width: 98%;">
              <el-option
              v-for="item in fieldValueDetail[sprintDetail.issue_config.since.field]"
              :key="item.key"
              :label="item.value"
              :value="item.key">
              </el-option>
          </el-select>
          </el-col>
          <el-col :span="4">
          <el-select
              v-model="sprintDetail.issue_config.since.improve"
              multiple
              clearable
              filterable
              allow-create
              default-first-option
              placeholder="Improve"
              style="width: 98%;">
              <el-option
              v-for="item in fieldValueDetail[sprintDetail.issue_config.since.field]"
              :key="item.value"
              :label="item.value"
              :value="item.key">
              </el-option>
          </el-select>
          </el-col>
          <el-col :span="4">
          <el-select
              v-model="sprintDetail.issue_config.since.customer"
              multiple
              clearable
              filterable
              allow-create
              default-first-option
              placeholder="Customer"
              style="width: 98%;">
              <el-option
              v-for="item in fieldValueDetail[sprintDetail.issue_config.since.field]"
              :key="item.key"
              :label="item.value"
              :value="item.key">
              </el-option>
          </el-select>
          </el-col>
          <el-col :span="5">
          <el-select
              v-model="sprintDetail.issue_config.since.qamissed"
              multiple
              clearable
              filterable
              allow-create
              default-first-option
              placeholder="QaMissed"
              style="width: 98%;">
              <el-option
              v-for="item in fieldValueDetail[sprintDetail.issue_config.since.field]"
              :key="item.key"
              :label="item.value"
              :value="item.key">
              </el-option>
          </el-select>
          </el-col>
      </el-form-item>

      <el-form-item label="Issue Category">
          <el-col :span="4">
          <el-select
              v-model="sprintDetail.issue_config.category.field"
              clearable
              filterable
              allow-create
              default-first-option
              @change="getTrackerFieldValue(sprintDetail.issue_config.category.field)"
              placeholder="Field"
              style="width: 100%;">
              <el-option
              v-for="item in fieldDetail"
              :key="item.key"
              :label="item.value"
              :value="item.key">
              </el-option>
          </el-select>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="6">
          <el-select
              v-model="sprintDetail.issue_config.category.newfeature"
              multiple
              clearable
              filterable
              allow-create
              default-first-option
              placeholder="NewFeature"
              style="width: 98%;">
              <el-option
              v-for="item in fieldValueDetail[sprintDetail.issue_config.category.field]"
              :key="item.key"
              :label="item.value"
              :value="item.key">
              </el-option>
          </el-select>
          </el-col>
          <el-col :span="6">
          <el-select
              v-model="sprintDetail.issue_config.category.regression"
              multiple
              clearable
              filterable
              allow-create
              default-first-option
              placeholder="Regression"
              style="width: 98%;">
              <el-option
              v-for="item in fieldValueDetail[sprintDetail.issue_config.category.field]"
              :key="item.key"
              :label="item.value"
              :value="item.key">
              </el-option>
          </el-select>
          </el-col>
          <el-col :span="6">
          <el-select
              v-model="sprintDetail.issue_config.category.previous"
              multiple
              clearable
              filterable
              allow-create
              default-first-option
              placeholder="Previous"
              style="width: 98%;">
              <el-option
              v-for="item in fieldValueDetail[sprintDetail.issue_config.category.field]"
              :key="item.key"
              :label="item.value"
              :value="item.key">
              </el-option>
          </el-select>
          </el-col>
      </el-form-item>

      <el-form-item label="Issue Status">
          <el-col :span="4">
          <el-select
              v-model="sprintDetail.issue_config.status.field"
              filterable
              clearable
              default-first-option
              @change="getTrackerFieldValue(sprintDetail.issue_config.status.field)"
              placeholder="Field"
              style="width: 100%;">
              <el-option
              v-for="item in fieldDetail"
              :key="item.key"
              :label="item.value"
              :value="item.key">
              </el-option>
          </el-select>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="6">
          <el-select
              v-model="sprintDetail.issue_config.status.fixing"
              multiple
              filterable
              clearable
              allow-create
              default-first-option
              placeholder="Fixing"
              style="width: 98%;">
              <el-option
              v-for="item in fieldValueDetail[sprintDetail.issue_config.status.field]"
              :key="item.key"
              :label="item.value"
              :value="item.key">
              </el-option>
          </el-select>
          </el-col>
          <el-col :span="6">
          <el-select
              v-model="sprintDetail.issue_config.status.fixed"
              multiple
              filterable
              clearable
              allow-create
              default-first-option
              placeholder="Fixed"
              style="width: 98%;">
              <el-option
              v-for="item in fieldValueDetail[sprintDetail.issue_config.status.field]"
              :key="item.key"
              :label="item.value"
              :value="item.key">
              </el-option>
          </el-select>
          </el-col>
          <el-col :span="6">
          <el-select
              v-model="sprintDetail.issue_config.status.verified"
              multiple
              filterable
              clearable
              allow-create
              default-first-option
              placeholder="Verified"
              style="width: 98%;">
              <el-option
              v-for="item in fieldValueDetail[sprintDetail.issue_config.status.field]"
              :key="item.key"
              :label="item.value"
              :value="item.key">
              </el-option>
          </el-select>
          </el-col>
      </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit" size="small">Save</el-button>
      <el-button @click="handleClose" size="small">Cancel</el-button>
      </span>
  </el-dialog>
</template>

<script>
import projectSvc from '@/services/projectSvc'
import sprintSvc from '@/services/sprintSvc'
import trackerSvc from '@/services/trackerSvc'
export default {
  name: 'EditSprint',
  props: {
    sprintID: {
      type: String
    }
  },
  data () {
    return {
      sprintDetail: {
        issue_config: {
          // category: {
          //   field: '',
          //   newfeature: [],
          //   previous: [],
          //   regression: []
          // },
          // rc: {
          //   field: '',
          //   value: []
          // },
          // requirement: {
          //   field: '',
          //   value: []
          // },
          // since: {
          //   field: '',
          //   customer: [],
          //   improve: [],
          //   newfeature: [],
          //   qamissed: []
          // },
          // sprint: {
          //   field: '',
          //   value: []
          // },
          // status: {
          //   field: '',
          //   fixed: [],
          //   fixing: [],
          //   verified: []
          // },
          // type: {
          //   field: '',
          //   value: []
          // },
          // version: {
          //   field: '',
          //   value: []
          // }

          category: {},
          rc: {},
          requirement: {},
          since: {},
          sprint: {},
          status: {},
          type: {},
          version: {}
        }
      },
      projectDetail: {},
      projects: [],
      fieldDetail: [],
      fieldValueDetail: {},
      dialogSprintVisible: true
    }
  },
  created () {
    this.listProject()
    // 根据sprint_id请求Sprint详情，并赋值到Sprint变量里
    this.getSprintDetail()
      .then(() => {
        return this.getProjectDetail()
      }).then(() => {
        // Object.entries(this.sprintDetail.issue_config).forEach(i => {
        //   if(i[1].field){
        //     this.getTrackerField()
        //   }
        //   console.log(i)
        // })
        return this.getTrackerField()
      }).then(() => {
        Object.values(this.sprintDetail.issue_config)
          .forEach(issueConfig => {
            if (issueConfig.field) {
              this.getTrackerFieldValue(issueConfig.field)
            }
          })
      })
    // 根据project_id请求project详情，并赋值到project变量中
    // 根据sprint_issue_config获取field_key和value_key
    // 根据tracker_id，获取field值
    // 根据tracker_id和field_key获取value值
  },
  methods: {
    listProject () {
      projectSvc.listProject()
        .then((response) => {
          console.log(response)
          this.projects = response.data.detail.results
        })
        .catch((error) => {
          this.$message.error(String(error))
          this.projects = []
        })
    },
    getSprintDetail () {
      return sprintSvc.getSprint(this.sprintID)
        .then((response) => {
          console.log(response)
          this.sprintDetail = response.data.detail

          // console.log(response.data.detail.issue_tracker.tracker_id)
          // trackerSvc.listTrackerIssueType(response.data.detail.issue_tracker.tracker_id)
          //   .then((response) => {
          //     this.selection.issue_config_field = response.data.detail.results
          //   })
          //   .catch((error) => {
          //     this.$message.error(String(error))
          //   })
        })
        .catch((error) => {
          this.$message.error(String(error))
        })
        // projectSvc.getProject(this.sprintData.project_id)
    },

    getProjectDetail () {
      return projectSvc.getProject(this.sprintDetail.project_id)
        .then((response) => {
          console.log(response)
          this.projectDetail = response.data.detail
        })
        .catch((error) => {
          this.$message.error(String(error))
        })
    },

    getTrackerField () {
      return trackerSvc.listTrackerIssueType(this.projectDetail.issue_tracker.tracker_id)
        .then((response) => {
          this.fieldDetail = response.data.detail.results
        })
        .catch((error) => {
          this.$message.error(String(error))
        })
    },

    getTrackerFieldValue (key) {
      if (this.fieldValueDetail[key]) {
        return
      }

      this.$set(this.fieldValueDetail, key, [])
      return trackerSvc.listTrackerIssueStatus(this.projectDetail.issue_tracker.tracker_id, key)
        .then((response) => {
          this.$set(this.fieldValueDetail, key, response.data.detail.results)
          console.log(this.fieldValueDetail)
        })
        .catch((error) => {
          this.$message.error(String(error))
        })
    },
    handleClose () {
      this.$emit('close')
    },

    submit () {
      console.log(this.sprintDetail)
      if (this.sprintDetail.id) {
        sprintSvc.updateSprint(this.sprintDetail)
          .then((response) => {
            console.log(response)
            this.$message.success('Success')
            this.handleClose()
            // this.dialogSprintVisible = false
            // sprintSvc.listSprint()
          })
          .catch((error) => {
            this.$message.error(String(error))
          })
      } else {
        sprintSvc.addSprint(this.sprintDetail)
          .then((response) => {
            console.log(response)
            this.$message.success('Success')
            this.handleClose()
            // this.dialogSprintVisible = false
            // sprintSvc.listSprint()
          })
          .catch((error) => {
            this.$message.error(String(error))
          })
      }
    }

  }
}
</script>
