# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create!(
  email: 'peter.nfonseca@gmail.com',
  password: 'password'
)

Band.create!(
  name: 'Mouse Rat'
)

Album.create!(
  band_id: 1,
  title: 'The Awesome Album',
  recording: 'studio'
)

Track.create!(
  album_id: 1,
  name: 'The Pit',
  bonus: 'regular',
  lyrics: <<-PIT
Pit.
I was in it, The Pit.
You were in it, The Pit.
We all were in it, The Pit.

The Pit.
I was in it, The Pit.
You were in it, The Pit.
We all fell in The Pit.

The Pit.
I fell in it, The Pit.
You fell in it, The Pit.
We all were in that Pit.

Oh, The Pit.
I fell in it, The Pit.
You fell in it, The Pit.
We all fell in it, The Pit.

Sometimes life's gonna get you down,
Hit the ground running, take a look around,
You think you found love, but you're standing in The Pit.

Sometimes life's gonna get you down,
Hit the ground running, take a look around,
You think you found love, but you're standing in The Pit.

The Pit.
Well I was in it, The Pit.
You were in it, The Pit.
We all fell in that Pit.
PIT
)
