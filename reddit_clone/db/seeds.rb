# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)"

require 'faker'

user_ids = (1..20).to_a

20.times do
  User.create!(
    email: Faker::Internet.email,
    password: 'secret'
  )
end

20.times do
  Sub.create!(
    title: Faker::Hipster.word,
    description: Faker::Hipster.sentence,
    moderator_id: user_ids.sample
  )
end

40.times do
  Post.create!(
    title: Faker::StarWars.character,
    content: Faker::StarWars.quote
  )
end
