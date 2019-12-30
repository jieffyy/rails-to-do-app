class User < ApplicationRecord
  has_many :tasks, dependent: :destroy
  validates :username, presence: true, uniqueness: true
end