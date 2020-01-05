class Task < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :tags, dependent: :destroy
  validates :task_name, presence: true
end
