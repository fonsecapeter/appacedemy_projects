# == Schema Information
#
# Table name: albums
#
#  id         :integer          not null, primary key
#  band_id    :integer          not null
#  recording  :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  title      :text             not null
#

class Album < ActiveRecord::Base
  validates :band_id, :title, presence: true
  validates :recording, :inclusion => { :in => %w(live studio),
    message: "must be live or studio" }

  belongs_to(
    :band,
    primary_key: :id,
    foreign_key: :band_id,
    class_name: 'Band'
  )

  has_many(
    :tracks,
    primary_key: :id,
    foreign_key: :album_id,
    class_name: 'Track'
  )
end
