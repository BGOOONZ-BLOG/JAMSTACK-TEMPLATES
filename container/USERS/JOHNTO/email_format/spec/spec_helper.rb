require 'rubygems'
require 'bundler/setup'
require 'rspec'
require 'active_model'
require 'email_format'

class FakeModel
  include ActiveModel::Validations

  attr_accessor :email

  validates :email, email_format: true
end

class FakeModelStrict
  include ActiveModel::Validations

  attr_accessor :email

  validates :email, email_format: { strict: true }
end

class FakeModelWithBlankEmail
  include ActiveModel::Validations

  attr_accessor :email

  validates :email, email_format: true, allow_blank: true
end
