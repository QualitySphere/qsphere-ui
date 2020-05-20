#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#
# Project Model
# uuid = PrimaryKey(uuid.UUID, default=uuid.uuid4)
# name = Required(str)
# tracker = Optional(Json)  # {'issue': {'id': 'UUID'}, 'case': {'id': 'UUID'}}
# project = Optional(Json)  # {'issue': {'key': '', 'value': ''}, 'case': {'key': '', 'value': ''}}
# status = Required(str, default='active')  # active, disable, delete
# sprints = Set('Sprint')


from pony.orm import db_session, select, get
from models.models import Tracker, Project


@db_session
def list_project(project_status=None):
    """
    List All Projects
    :param project_status:
    :return: {[
      'id': '',
      'name': '',
      'tracker': {
        'issue': {
          'id': '',
          'name': ''
        },
        'case': {
          'id': '',
          'name': ''
        }
      },
      'project': {
        'issue': {
          'key': '',
          'value': ''
        },
        'case': {
          'key': '',
          'value': ''
        }
      },
      'status': ''
    ]}
    """
    projects = list()
    if project_status:
        items = select(p for p in Project if p.status in project_status).order_by(Project.name)
    else:
        items = select(p for p in Project).order_by(Project.name)
    for item in items:
        projects.append({
            'id': item.uuid,
            'name': item.name,
            'tracker': item.tracker,
            'project': item.project,
            'status': item.status
        })
    return projects


@db_session
def get_project(project_id: str):
    """
    Get Project
    :param project_id:
    :return: {
      'id': '',
      'name': '',
      'tracker': {
        'issue': {
          'id': '',
          'name': ''
        },
        'case': {
          'id': '',
          'name': ''
        }
      },
      'project': {
        'issue': {
          'key': '',
          'value': ''
        },
        'case': {
          'key': '',
          'value': ''
        }
      },
      'status': ''
    }
    """
    item = get(p for p in Project if str(p.uuid) == project_id)
    project = dict()
    if item:
        project = {
            'id': item.uuid,
            'name': item.name,
            'tracker': item.tracker,
            'project': item.project,
            'status': item.status
        }
    return project


@db_session
def add_project(item: dict):
    """
    Add Project
    :param item: {
        name: String,
        tracker: {
            issue: {
                id: uuid
            },
            case: {
                id: uuid
            }
        },
        project: {
            issue: {
                key: string
                value: sting
            },
            case: {
                key: string,
                value: string
            },
        }
    }
    :return:
    """
    _project = Project(
        name=item.get('name'),
        tracker=item.get('tracker'),
        project=item.get('project')
    )
    return _project.uuid


@db_session
def update_project(project_id: str, item: dict):
    """
    Update Project
    :param project_id:
    :param item:
    :return:
    """
    _project = get(p for p in Project if str(p.uuid) == project_id)
    _project.name = item.get('name')
    _project.status = item.get('status') or 'active'
    _project.issue_tracker = get(c for c in Tracker if str(c.uuid) == item.get('tracker').get('issue').get('id'))
    _project.issue_tracker_project = item.get('project').get('issue')
    _project.case_tracker = get(c for c in Tracker if str(c.uuid) == item.get('tracker').get('case').get('id'))
    _project.case_tracker_project = item.get('project').get('case')
    return _project.uuid


@db_session
def set_project_status(project_id: dict, project_status: str):
    """
    Delete Project
    :param project_id:
    :param project_status:
    :return:
    """
    _project = get(p for p in Project if str(p.uuid) == project_id)
    _project.status = project_status.lower()
    return True


if __name__ == '__main__':
    print(u'This is a service of project')
