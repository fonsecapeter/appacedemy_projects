# == Schema Information
#
# Table name: bands
#
#  id         :integer          not null, primary key
#  name       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Band < ActiveRecord::Base
  validates :name, presence: true

  has_many(
    :albums,
    primary_key: :id,
    foreign_key: :band_id,
    class_name: 'Album'
  )

  has_many(
    :tracks,
    through: :albumns,
    source: :tracks
  )
end
