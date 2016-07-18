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
I was in it, The Pit.\n
You were in it, The Pit.\n
We all were in it, The Pit.\n
\n
The Pit.\n
I was in it, The Pit.\n
You were in it, The Pit.\n
We all fell in The Pit.\n
\n
The Pit.\n
I fell in it, The Pit.\n
You fell in it, The Pit.\n
We all were in that Pit.\n
\n
Oh, The Pit.\n
I fell in it, The Pit.\n
You fell in it, The Pit.\n
We all fell in it, The Pit.\n
\n
Sometimes life's gonna get you down,\n
Hit the ground running, take a look around,\n
You think you found love, but you're standing in The Pit.\n
\n
Sometimes life's gonna get you down,\n
Hit the ground running, take a look around,\n
You think you found love, but you're standing in The Pit.\n
\n
The Pit.\n
Well I was in it, The Pit.\n
You were in it, The Pit.\n
We all fell in that Pit.\n
PIT
)

Track.create!(
  album_id: 1,
  name: 'Remember',
  bonus: 'regular',
  lyrics: <<-REMEMBER
Remember, when we first met?\n
You gave me love like i’ll never forget\n
Remember when you first told me\n
You would be my one and only\n
Then you went away\n
\n
All I’ve got is a memory\n
Of everything that used to be\n
All i’ve got is a memory\n
Of better times with you and me\n
Together you and me forever\n
You and me together forever\n
\n
Together, forever\n
\n
All i’ve got is a memory\n
Of everything that used to be\n
All i’ve got is a memory\n
Of better times with you and me\n
Together you and me forever\n
You and me together forever\n
REMEMBER
)

Track.create!(
  album_id: 1,
  name: 'Menace Ball',
  bonus: 'regular',
  lyrics: <<-MENACE
I know you've been changing\n
But I've been changing too\n
You say that you moved on\n
Well I still dream of you\n
And I know I never believed\n
That you would ever go\n
And I was blind to see\n
That we were through\n
When you walked out\n
I waited to see if you would turn around\n
And come running back to me\n
But that would never be\n
That would never be\n
Well I know we had bad times\n
But we had good times too\n
And I only remember\n
The good times shared with you\n
And I know I never believed\n
That you would ever go\n
And I was blind to see\n
That we were through\n
When you walked out\n
I waited to see if you would turn around\n
And come running back to me\n
But that would never be\n
Spread your wings and fly\n
Spread your wings and fly\n
MENACE
)

Album.create!(
  band_id: 1,
  title: '5000 Candles in the Wind (Single)',
  recording: 'live'
)

Track.create!(
  album_id: 2,
  name: '5000 Candles in the Wind',
  bonus: 'bonus',
  lyrics: <<-SEBASTIAN
Up in horsey heaven, here's the thing\n
You trade your legs for angels wings\n
And once we’ve all said good-bye\n
You take a running leap and you learn to fly\n
\n
Bye Bye Li'l Sebastian\n
Miss you in the saddest fashion\n
Bye Bye Li'l Sebastian\n
You’re 5000 candles in the wind\n
\n
And though we all miss you everyday\n
We know you're up there eating heaven's hay\n
And here's the part that hurts the most\n
Humans cannot ride a ghost\n
\n
Bye Bye Li'l Sebastian\n
Miss you in the saddest fashion\n
Bye Bye Li'l Sebastian\n
You’re 5000 candles in the wind\n
\n
Everybody sing it now!\n
\n
Bye Bye Li'l Sebastian\n
Miss you in the saddest fashion\n
Bye Bye Li'l Sebastian\n
You’re 5000 candles in the wind\n
\n
Maybe someday we'll saddle up again\n
And I know I'll always miss my horsiest friend\n
Spread your wings and fly\n
Spread your wings and fly\n
SEBASTIAN
)
