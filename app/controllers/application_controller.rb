class ApplicationController < ActionController::Base
  private
    def push_to_task(task, tag)
      if !task.tags.exists?(tag.id)
        task.tags << tag
      end
    end
end
