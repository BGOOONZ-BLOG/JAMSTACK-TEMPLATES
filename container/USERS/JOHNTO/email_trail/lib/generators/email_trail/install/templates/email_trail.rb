class EmailTrail < ActiveRecord::Base
  belongs_to :emailable, polymorphic: true
end
