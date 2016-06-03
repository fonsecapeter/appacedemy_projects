# == Schema Information
#
# Table name: tracks
#
#  id         :integer          not null, primary key
#  album_id   :integer          not null
#  name       :text             not null
#  bonus      :text             default("false"), not null
#  lyrics     :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Track < ActiveRecord::Base
  validates :album, :name, :lyrics, presence: true
  validates :bonus, :inclusion => { :in => %w(bonus regular),
    message: "must be bonus or regular" }
  before_validation :ensure_bonus!

  belongs_to(
    :album,
    primary_key: :id,
    foreign_key: :album_id,
    class_name: 'Album'
  )

  has_one(
    :band,
    through: :album,
    source: :band
  )

  private

  def ensure_bonus!
    self.bonus ||= false
  end
end
