class Tag < ApplicationRecord
  has_and_belongs_to_many :tasks
  validates :tag_name, presence: true, uniqueness: true
end
