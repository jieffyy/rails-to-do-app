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
    def _save_tag(tag_name)
      @tag = Tag.find_by(:tag_name => tag_name)
      if !@tag
        Tag.create(:tag_name => tag_name)
        @tag = Tag.find_by(:tag_name => tag_name)
      end 
      return @tag
    end
end
