FactoryGirl.define do

  factory :project do
    sequence(:name){ |n| "Project#{n} name" }
  end

end
