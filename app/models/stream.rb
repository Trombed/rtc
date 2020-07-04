# == Schema Information
#
# Table name: streams
#
#  id         :bigint           not null, primary key
#  user_id    :integer          not null
#  live       :boolean          default(FALSE)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Stream < ApplicationRecord
    validates :user_id, presence: true

    belongs_to :user,
    foreign_key: :user_id,
    class_name: :User

end
