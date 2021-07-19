# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'email_format/version'

Gem::Specification.new do |spec|
  spec.name          = 'email_format'
  spec.version       = EmailFormat::VERSION
  spec.authors       = ['johnotander']
  spec.email         = ['johnotander@gmail.com']
  spec.description   = %q{Validates the email format.}
  spec.summary       = %q{Validates the email format with the email_regex gem.}
  spec.homepage      = 'https://github.com/johnotander/email_format'
  spec.license       = 'MIT'

  spec.files         = `git ls-files`.split($/)
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ['lib']

  spec.add_development_dependency 'rspec'
  spec.add_development_dependency 'bundler', '> 1.10'
  spec.add_development_dependency 'rake'

  spec.add_dependency 'activemodel'
  spec.add_dependency 'email_regex'
end
