class Task < ApplicationRecord
    validates :name, presence: true, if: :done_at_is_correct?

    def done_at_is_correct?
        is_done && done_at
    end
end
