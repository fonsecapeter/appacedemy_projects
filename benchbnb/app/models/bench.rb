# == Schema Information
#
# Table name: benches
#
#  id          :integer          not null, primary key
#  lat         :float            not null
#  lon         :float            not null
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Bench < ActiveRecord::Base
  validates :lat, :lon, presence: true
end
