<template>
  <div>
    <el-row style="margin-bottom: 15px" type="flex">
      <el-button plain round type="primary" size="small" @click="initSprint(); dialogSprintVisible = true">
        <i class="el-icon-plus el-icon--left"></i>New Sprint
      </el-button>
      <el-tooltip placement="bottom-start">
        <div slot="content" v-html="content"></div>
        <i class="el-icon-question el-icon--right"></i>
      </el-tooltip>
    </el-row>
    <el-row>
      <el-table
        v-loading="sprintTableLoading"
        :data="sprintTableData"
        :border="true"
        style="width: 100%;">
        <el-table-column prop="name" label="Sprint" width="200"></el-table-column>
        <el-table-column prop="project_name" label="Project" width=""></el-table-column>
        <el-table-column
          label="Sync"
          width="100">
          <template slot-scope="scope">
            <el-button
              @click="syncSprintIssue(scope.row.id)"
              size="mini"
              icon="el-icon-refresh"
              circle>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="Active"
          width="100">
          <template slot-scope="scope">
            <el-tooltip :content="'Status is ' + scope.row.status">
              <el-switch
                v-model="scope.row.status"
                @change="activeSprint(scope.row.id, scope.row.status)"
                active-value='active'
                inactive-value='disable'>
              </el-switch>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          label="Action"
          width="150">
          <template slot-scope="scope">
            <el-button
              @click="editSprint(scope.row.id)"
              size="mini"
              type="primary"
              icon="el-icon-edit"
              circle>
            </el-button>
            <el-button
              @click="deleteSprint(scope.row.id)"
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-dialog title="Sprint" :visible.sync="dialogSprintVisible" width="60%">
      <el-form
        :label-position="labelPosition"
        :border="true"
        :model="sprintData"
        label-width="120px"
        style="width: 100%;">
        <el-form-item label="Sprint Name">
          <el-input
            v-model="sprintData.name"
            placeholder="Input Sprint Name">
          </el-input>
        </el-form-item>
        <el-form-item label="Project">
          <el-select
            v-model="sprintData.project_id"
            filterable
            clearable
            @focus="listProject()"
            placeholder="Select Project"
            style="width: 100%;">
            <el-option
              v-for="item in selection.projects"
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
              v-model="sprintData.issue_config.sprint.field"
              filterable
              clearable
              @focus="listIssueConfigField()"
              placeholder="Field"
              style="width: 100%;">
              <el-option
                v-for="item in selection.issue_config_field"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="18">
            <el-select
              v-model="sprintData.issue_config.sprint.value"
              multiple
              filterable
              clearable
              allow-create
              @focus="listSprintValue()"
              placeholder="Value"
              style="width: 100%;">
              <el-option
                v-for="item in selection.sprintValue"
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
              v-model="sprintData.issue_config.requirement.field"
              filterable
              clearable
              @focus="listIssueConfigField()"
              placeholder="Field"
              style="width: 100%;">
              <el-option
                v-for="item in selection.issue_config_field"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="18">
            <el-select
              v-model="sprintData.issue_config.requirement.value"
              multiple
              filterable
              clearable
              allow-create
              @focus="listRequirementValue()"
              placeholder="Value(s)"
              style="width: 100%;">
              <el-option
                v-for="item in selection.requirementValue"
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
              v-model="sprintData.issue_config.version.field"
              filterable
              clearable
              @focus="listIssueConfigField()"
              placeholder="Field"
              style="width: 100%;">
              <el-option
                v-for="item in selection.issue_config_field"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="18">
            <el-select
              v-model="sprintData.issue_config.version.value"
              multiple
              filterable
              clearable
              allow-create
              @focus="listVersionValue()"
              placeholder="Value"
              style="width: 100%;">
              <el-option
                v-for="item in selection.versionValue"
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
              v-model="sprintData.issue_config.rc.field"
              filterable
              clearable
              @focus="listIssueConfigField()"
              placeholder="Field"
              style="width: 100%;">
              <el-option
                v-for="item in selection.issue_config_field"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="18">
            <el-select
              v-model="sprintData.issue_config.rc.value"
              multiple
              filterable
              clearable
              allow-create
              @focus="listRC()"
              placeholder="Value(s)"
              style="width: 100%;">
              <el-option
                v-for="item in selection.rcValue"
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
              v-model="sprintData.issue_config.type.field"
              clearable
              filterable
              @focus="listIssueConfigField()"
              placeholder="Field"
              style="width: 100%;">
              <el-option
                v-for="item in selection.issue_config_field"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="18">
            <el-select
              v-model="sprintData.issue_config.type.value"
              multiple
              clearable
              filterable
              allow-create
              @focus="listTypeValue()"
              placeholder="Value(s)"
              style="width: 100%;">
              <el-option
                v-for="item in selection.typeValue"
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
              v-model="sprintData.issue_config.since.field"
              clearable
              filterable
              @focus="listIssueConfigField()"
              placeholder="Field"
              style="width: 100%;">
              <el-option
                v-for="item in selection.issue_config_field"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="5">
            <el-select
              v-model="sprintData.issue_config.since.newfeature"
              multiple
              clearable
              filterable
              allow-create
              default-first-option
              @focus="listSinceValue()"
              placeholder="NewFeature"
              style="width: 98%;">
              <el-option
                v-for="item in selection.sinceValue"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-select
              v-model="sprintData.issue_config.since.improve"
              multiple
              clearable
              filterable
              allow-create
              default-first-option
              @focus="listSinceValue()"
              placeholder="Improve"
              style="width: 98%;">
              <el-option
                v-for="item in selection.sinceValue"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-select
              v-model="sprintData.issue_config.since.customer"
              multiple
              clearable
              filterable
              allow-create
              default-first-option
              @focus="listSinceValue()"
              placeholder="Customer"
              style="width: 98%;">
              <el-option
                v-for="item in selection.sinceValue"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5">
            <el-select
              v-model="sprintData.issue_config.since.qamissed"
              multiple
              clearable
              filterable
              allow-create
              default-first-option
              @focus="listSinceValue()"
              placeholder="QaMissed"
              style="width: 98%;">
              <el-option
                v-for="item in selection.sinceValue"
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
              v-model="sprintData.issue_config.category.field"
              clearable
              filterable
              allow-create
              default-first-option
              @focus="listIssueConfigField()"
              placeholder="Field"
              style="width: 100%;">
              <el-option
                v-for="item in selection.issue_config_field"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="6">
            <el-select
              v-model="sprintData.issue_config.category.newfeature"
              multiple
              clearable
              filterable
              allow-create
              default-first-option
              @focus="listCategoryValue()"
              placeholder="NewFeature"
              style="width: 98%;">
              <el-option
                v-for="item in selection.categoryValue"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select
              v-model="sprintData.issue_config.category.regression"
              multiple
              clearable
              filterable
              allow-create
              default-first-option
              @focus="listCategoryValue()"
              placeholder="Regression"
              style="width: 98%;">
              <el-option
                v-for="item in selection.categoryValue"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select
              v-model="sprintData.issue_config.category.previous"
              multiple
              clearable
              filterable
              allow-create
              default-first-option
              @focus="listCategoryValue()"
              placeholder="Previous"
              style="width: 98%;">
              <el-option
                v-for="item in selection.categoryValue"
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
              v-model="sprintData.issue_config.status.field"
              filterable
              clearable
              default-first-option
              @focus="listIssueConfigField()"
              placeholder="Field"
              style="width: 100%;">
              <el-option
                v-for="item in selection.issue_config_field"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="6">
            <el-select
              v-model="sprintData.issue_config.status.fixing"
              multiple
              filterable
              clearable
              allow-create
              default-first-option
              @focus="listStatusValue()"
              placeholder="Fixing"
              style="width: 98%;">
              <el-option
                v-for="item in selection.statusValue"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select
              v-model="sprintData.issue_config.status.fixed"
              multiple
              filterable
              clearable
              allow-create
              default-first-option
              placeholder="Fixed"
              style="width: 98%;">
              <el-option
                v-for="item in selection.statusValue"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select
              v-model="sprintData.issue_config.status.verified"
              multiple
              filterable
              clearable
              allow-create
              default-first-option
              placeholder="Verified"
              style="width: 98%;">
              <el-option
                v-for="item in selection.statusValue"
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
        <el-button @click="dialogSprintVisible = false" size="small">Cancel</el-button>
      </span>
    </el-dialog>
    <editSprint :sprintID="selectedSprintId" @close="closeEditSprintModal" v-if="showEditSprintModal" />
  </div>
</template>

<script>
import trackerSvc from '@/services/trackerSvc'
import projectSvc from '@/services/projectSvc'
import sprintSvc from '@/services/sprintSvc'
import issueSvc from '@/services/issueSvc'
import editSprint from '@/components/modal/editSprint.vue'

export default {
  name: 'tttt',
  components: {
    editSprint
  },
  props: {
    sprintTableData: {
      type: Array
    },
    sprintTableLoading: {
      type: Boolean
    },
    listSprint: {
      type: Function
    }
  },
  data () {
    return {
      content: `
        <h3>Sprint</h3>
        Define sprint information<br>
        Sprint name should be same at all platforms<br>
      `,
      dialogSprintVisible: false,
      labelPosition: 'right',
      selection: {
        projects: [],
        issue_config_field: [],
        categoryValue: [],
        rcValue: [],
        requirementValue: [],
        sinceValue: [],
        sprintValue: [],
        statusValue: [],
        typeValue: [],
        versionValue: []
      },
      // sprintData: {
      //       project_id: '',
      //       name: '',
      //       version: '',
      //       requirements: [],
      //       rcs: [],
      //       issue: {
      //         types: [],
      //         found_since: [],
      //         statuses: {
      //           fixing: [],
      //           fixed: [],
      //           verified: []
      //         },
      //         categories: []
      //       },
      //       case: {}
      //     }
      //   }
      // }
      sprintData: {
        name: '',
        project_id: '',
        case_config: {},
        issue_config: {
          category: {
            field: '',
            newfeature: [],
            previous: [],
            regression: []
          },
          rc: {
            field: '',
            value: []
          },
          requirement: {
            field: '',
            value: []
          },
          since: {
            field: '',
            customer: [],
            improve: [],
            newfeature: [],
            qamissed: []
          },
          sprint: {
            field: '',
            value: []
          },
          status: {
            field: '',
            fixed: [],
            fixing: [],
            verified: []
          },
          type: {
            field: '',
            value: []
          },
          version: {
            field: '',
            value: []
          }
        }
      },
      selectedSprintId: '',
      showEditSprintModal: false
    }
  },
  //     sprintData: {
  //       project_id: '',
  //       name: '',
  //       version: '',
  //       requirements: [],
  //       rcs: [],
  //       issue: {
  //         types: [],
  //         found_since: [],
  //         statuses: {
  //           fixing: [],
  //           fixed: [],
  //           verified: []
  //         },
  //         categories: []
  //       },
  //       case: {}
  //     }
  //   }
  // },
  methods: {
    listProject () {
      projectSvc.listProject()
        .then((response) => {
          console.log(response)
          this.selection.projects = response.data.detail.results
        })
        .catch((error) => {
          this.$message.error(String(error))
          this.selection.projects = []
        })
    },
    listIssueConfigField () {
      projectSvc.getProject(this.sprintData.project_id)
        .then((response) => {
          console.log(response)
          console.log(response.data.detail.issue_tracker.tracker_id)
          trackerSvc.listTrackerIssueType(response.data.detail.issue_tracker.tracker_id)
            .then((response) => {
              this.selection.issue_config_field = response.data.detail.results
            })
            .catch((error) => {
              this.$message.error(String(error))
            })
        })
        .catch((error) => {
          this.$message.error(String(error))
        })
    },
    listSprintValue () {
      projectSvc.getProject(this.sprintData.project_id)
        .then((response) => {
          console.log(response)
          trackerSvc.listTrackerIssueStatus(response.data.detail.issue_tracker.tracker_id, this.sprintData.issue_config.sprint.field)
            .then((response) => {
              console.log(response)
              this.selection.sprintValue = response.data.detail.results
            })
            .catch((error) => {
              this.$message.error(String(error))
              this.selection.sprintValue = []
            })
        })
        .catch((error) => {
          this.$message.error(String(error))
        })
    },
    listRequirementValue () {
      projectSvc.getProject(this.sprintData.project_id)
        .then((response) => {
          console.log(response)
          trackerSvc.listTrackerIssueStatus(response.data.detail.issue_tracker.tracker_id, this.sprintData.issue_config.requirement.field)
            .then((response) => {
              console.log(response)
              this.selection.requirementValue = response.data.detail.results
            })
            .catch((error) => {
              this.$message.error(String(error))
              this.selection.requirementValue = []
            })
        })
        .catch((error) => {
          this.$message.error(String(error))
        })
    },
    listVersionValue () {
      projectSvc.getProject(this.sprintData.project_id)
        .then((response) => {
          console.log(response)
          trackerSvc.listTrackerIssueStatus(response.data.detail.issue_tracker.tracker_id, this.sprintData.issue_config.version.field)
            .then((response) => {
              console.log(response)
              this.selection.versionValue = response.data.detail.results
            })
            .catch((error) => {
              this.$message.error(String(error))
              this.selection.versionValue = []
            })
        })
        .catch((error) => {
          this.$message.error(String(error))
        })
    },
    listRC () {
      projectSvc.getProject(this.sprintData.project_id)
        .then((response) => {
          console.log(response)
          trackerSvc.listTrackerIssueStatus(response.data.detail.issue_tracker.tracker_id, this.sprintData.issue_config.rc.field)
            .then((response) => {
              console.log(response)
              this.selection.rcValue = response.data.detail.results
            })
            .catch((error) => {
              this.$message.error(String(error))
              this.selection.rcValue = []
            })
        })
        .catch((error) => {
          this.$message.error(String(error))
        })
    },
    // listIssueType () {
    //   projectSvc.getProject(this.sprintData.project_id)
    //     .then((response) => {
    //       console.log(response)
    //       console.log(response.data.detail.issue_tracker.tracker_id)
    //       trackerSvc.listTrackerIssueType(response.data.detail.issue_tracker.tracker_id)
    //         .then((response) => {
    //           this.selection.issue_types = response.data.detail.results
    //         })
    //         .catch((error) => {
    //           this.$message.error(String(error))
    //         })
    //     })
    //     .catch((error) => {
    //       this.$message.error(String(error))
    //     })
    // },
    listTypeValue () {
      projectSvc.getProject(this.sprintData.project_id)
        .then((response) => {
          console.log(response)
          trackerSvc.listTrackerIssueStatus(response.data.detail.issue_tracker.tracker_id, this.sprintData.issue_config.type.field)
            .then((response) => {
              console.log(response)
              this.selection.typeValue = response.data.detail.results
            })
            .catch((error) => {
              this.$message.error(String(error))
              this.selection.typeValue = []
            })
        })
        .catch((error) => {
          this.$message.error(String(error))
        })
    },
    listSinceValue () {
      projectSvc.getProject(this.sprintData.project_id)
        .then((response) => {
          console.log(response)
          trackerSvc.listTrackerIssueStatus(response.data.detail.issue_tracker.tracker_id, this.sprintData.issue_config.since.field)
            .then((response) => {
              console.log(response)
              this.selection.sinceValue = response.data.detail.results
            })
            .catch((error) => {
              this.$message.error(String(error))
              this.selection.sinceValue = []
            })
        })
        .catch((error) => {
          this.$message.error(String(error))
        })
    },
    listCategoryValue () {
      projectSvc.getProject(this.sprintData.project_id)
        .then((response) => {
          console.log(response)
          trackerSvc.listTrackerIssueStatus(response.data.detail.issue_tracker.tracker_id, this.sprintData.issue_config.category.field)
            .then((response) => {
              console.log(response)
              this.selection.categoryValue = response.data.detail.results
            })
            .catch((error) => {
              this.$message.error(String(error))
              this.selection.categoryValue = []
            })
        })
        .catch((error) => {
          this.$message.error(String(error))
        })
    },
    listStatusValue () {
      projectSvc.getProject(this.sprintData.project_id)
        .then((response) => {
          console.log(response)
          trackerSvc.listTrackerIssueStatus(response.data.detail.issue_tracker.tracker_id, this.sprintData.issue_config.status.field)
            .then((response) => {
              console.log(response)
              this.selection.statusValue = response.data.detail.results
            })
            .catch((error) => {
              this.$message.error(String(error))
              this.selection.statusValue = []
            })
        })
        .catch((error) => {
          this.$message.error(String(error))
        })
    },
    // listIssueStatus () {
    //   projectSvc.getProject(this.sprintData.project_id)
    //     .then((response) => {
    //       console.log(response)
    //       console.log(response.data.detail.issue_tracker.tracker_id)
    //       trackerSvc.listTrackerIssueType(response.data.detail.issue_tracker.tracker_id)
    //         .then((response) => {
    //           this.selection.issue_statuses = response.data.detail.results
    //         })
    //         .catch((error) => {
    //           this.$message.error(String(error))
    //         })
    //     })
    //     .catch((error) => {
    //       this.$message.error(String(error))
    //     })
    // },

    // listIssueStatus () {
    //   this.selection.issue_statuses = ['fixed', 'backlog', 'new', 'fixing', 'verified']
    // },
    // listRC () {
    //   this.selection.rcs = ['RC1', 'RC2', 'RC3', 'RC4', 'RC5']
    // },
    // listIssueFoundSince () {
    //   this.selection.issue_found_since = ['RegressionImprove', 'QAMissed', 'NewFeature', 'Customer']
    // },
    // listIssueCategories () {
    //   this.selection.issue_categories = ['Regression', 'Previous', 'NewFeature', 'Others']
    // },
    submit () {
      console.log(this.sprintData)
      if (this.sprintData.id) {
        sprintSvc.updateSprint(this.sprintData)
          .then((response) => {
            console.log(response)
            this.$message.success('Success')
            this.dialogSprintVisible = false
            this.listSprint()
          })
          .catch((error) => {
            this.$message.error(String(error))
          })
      } else {
        sprintSvc.addSprint(this.sprintData)
          .then((response) => {
            console.log(response)
            this.$message.success('Success')
            this.dialogSprintVisible = false
            this.listSprint()
          })
          .catch((error) => {
            this.$message.error(String(error))
          })
      }
    },
    activeSprint (sprintId, sprintStatus) {
      console.log('Set sprint ' + sprintId + ' status as ' + sprintStatus)
      sprintSvc.activeSprint(sprintId, sprintStatus)
        .then((response) => {
          this.$message.success('Set status as ' + sprintStatus)
          this.listSprint()
        })
        .catch((error) => {
          this.$message.error(String(error))
        })
    },
    deleteSprint (sprintId) {
      console.log('Delete sprint' + sprintId)
      sprintSvc.deleteSprint(sprintId)
        .then((response) => {
          this.$message.success('Deleted')
          this.listSprint()
        })
        .catch((error) => {
          this.$message.error(String(error))
        })
    },
    editSprint (sprintId) {
      this.selectedSprintId = sprintId
      this.showEditSprintModal = true
      // this.listProject()
      // console.log('Edit sprint: ' + sprintId)
      // sprintSvc.getSprint(sprintId)
      //   .then((response) => {
      //     console.log(response.data.detail)
      //     this.sprintData.name = response.data.detail.name
      //     this.sprintData.project_id = response.data.detail.project_id
      //     this.sprintData.case_config = response.data.detail.case_config
      //     this.sprintData.issue_config = response.data.detail.issue_config
      //     this.sprintData.id = response.data.detail.id
      //     // this.sprintData.name = response.data.detail.name
      //     // this.sprintData.project_id = response.data.detail.project_id
      //     // this.sprintData.version = response.data.detail.version
      //     // this.sprintData.requirements = response.data.detail.requirements
      //     // this.sprintData.rcs = response.data.detail.rcs
      //     // this.sprintData.issue = response.data.detail.issue
      //     // this.sprintData.case = response.data.detail.case
      //   })
      //   .catch((error) => {
      //     this.$message.error(String(error))
      //   })
    },
    closeEditSprintModal () {
      this.showEditSprintModal = false
    },
    initSprint () {
      this.sprintData.name = ''
      this.sprintData.project_id = ''
      this.sprintData.case_config = {}
      this.sprintData.issue_config = {
        category: {
          field: '',
          newfeature: [],
          previous: [],
          regression: []
        },
        rc: {
          field: '',
          value: []
        },
        requirement: {
          field: '',
          value: []
        },
        since: {
          field: '',
          customer: [],
          improve: [],
          newfeature: [],
          qamissed: []
        },
        sprint: {
          field: '',
          value: []
        },
        status: {
          field: '',
          fixed: [],
          fixing: [],
          verified: []
        },
        type: {
          field: '',
          value: []
        },
        version: {
          field: '',
          value: []
        }
      }
      this.sprintData.id = ''
      // this.sprintData.name = ''
      // this.sprintData.project_id = ''
      // this.sprintData.version = ''
      // this.sprintData.requirements = []
      // this.sprintData.rcs = []
      // this.sprintData.issue = {
      //   types: [],
      //   found_since: [],
      //   statuses: {
      //     fixing: [],
      //     fixed: [],
      //     verified: []
      //   },
      //   categories: []
      // }
      // this.sprintData.case = {}
    },
    syncSprintIssue (sprintId) {
      console.log('Sync issue status of sprint ' + sprintId)
      this.$message.success('Start to sync')
      issueSvc.syncSprintIssue(sprintId)
        .then((response) => {
          console.log(response)
          this.$message.success('Complete to sync')
        })
        .catch((error) => {
          this.$message.error(String(error))
        })
    }
  }
}
</script>
