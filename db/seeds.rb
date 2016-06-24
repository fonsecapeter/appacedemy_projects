# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

lats = [37.759246, 37.790622, 37.768529, 37.792061]
lons = [-122.487390, -122.427094, -122.391908, -122.394173]

i = 0
while(i < lats.length) do
  Bench.create(
    lat: lats[i],
    lon: lons[i],
    description: Faker::SlackEmoji.emoji
  )
  i += 1
end
