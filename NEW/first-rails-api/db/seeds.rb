5.times do
  Post.create({
    title: Faker::Book.title,
    body: Faker::Lorem.sentence
  })
end