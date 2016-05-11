# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Car.destroy_all
Comment.destroy_all

newCar = Car.create({
      carMake: "BMW",
      carModel: "M3",
      zipCode: "20850",
      radius: "100"
    })

newCar.comments.create({
      author: "Can't Buy Me Love",
      body: "http://www.wdidc.org/wdi-radio-lab-assets/mp3/The%20Beatles%20-%20Can%27t%20Buy%20Me%20Love.mp3",
    })
