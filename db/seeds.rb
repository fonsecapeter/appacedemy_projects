require 'faker'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

10.times do |num|
  pwd = BCrypt::Password.create("password#{num + 1}")
  User.create!(user_name: Faker::Superhero.name, password_digest: pwd)
end

10.times do
  Cat.create!(birth_date: Faker::Date.backward(3000),
             color: %w(black white orange brown).sample,
             user_id: (1..10).to_a.sample,
             name: Faker::Hipster.word.capitalize,
             sex: %w(M F).sample,
             description: Faker::Hipster.sentence
             )
end
40.times do
  CatRentalRequest.create!(
    cat_id: (1..10).to_a.sample,
    user_id: (1..10).to_a.sample,
    end_date: Faker::Date.forward(3000),
    start_date: Faker::Date.forward(0),
    status: "PENDING"
  )
end
