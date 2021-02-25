class DoneAtDateTime < ActiveModel::Validator
    def validate(record)
        if record.is_done && !record.done_at
            record.errors.add :is_done, "Need a datetime to track when it has been completed"
        elsif !record.is_done && record.done_at
            record.errors.add :is_done, "Need to remove datetime when it is not complete"
        end
    end
end

class Task < ApplicationRecord
    include ActiveModel::Validations
    validates :name, presence: true
    validates_with DoneAtDateTime

    def done_at_is_correct?
        # puts is_done && done_at
        is_done && done_at
    end
end
