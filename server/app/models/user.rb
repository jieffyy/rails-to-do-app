# See https://api.rubyonrails.org/classes/ActiveModel/SecurePassword/ClassMethods.html#method-i-has_secure_password
# For validations included by has_secure_password

class User < ApplicationRecord
    validates :username, presence: true
    has_secure_password

    has_many :tags
    has_many :tasks
end
