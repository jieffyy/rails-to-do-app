class ApplicationController < ActionController::Base
  # before_action :require_login

  # private
  #   def require_login
  #     unless cookies[:user_id]
  #       flash[:notice] = "You need to login!"
  #       redirect_to root_url
  #     end
  #   end

  private
    def push_to_task(task, tag)
      if !task.tags.exists?(tag.id)
        task.tags << tag
      end
    end
end
