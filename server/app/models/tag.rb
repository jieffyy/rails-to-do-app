# frozen_string_literal: true

class Tag < ApplicationRecord
  validates :name, presence: true

  belongs_to :user

  # rubocop:disable Rails/HasAndBelongsToMany
  has_and_belongs_to_many :tasks
  # rubocop:enable Rails/HasAndBelongsToMany
end
