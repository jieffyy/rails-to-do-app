class Api::TaskResource < JSONAPI::Resource
  attributes :task_name, :task_desc
end