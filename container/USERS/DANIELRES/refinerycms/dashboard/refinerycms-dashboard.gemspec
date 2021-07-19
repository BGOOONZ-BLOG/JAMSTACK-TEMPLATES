# Encoding: UTF-8
require File.expand_path('../../core/lib/refinery/version', __FILE__)

version = Refinery::Version.to_s

Gem::Specification.new do |s|
  s.platform          = Gem::Platform::RUBY
  s.name              = %q{refinerycms-dashboard}
  s.version           = version
  s.summary           = %q{Dashboard extension for Refinery CMS}
  s.description       = %q{The dashboard is usually the first extension the user sees in the backend of Refinery CMS. It displays useful information and contains links to common functionality.}
  s.email             = %q{info@refinerycms.com}
  s.homepage          = %q{http://refinerycms.com}
  s.rubyforge_project = %q{refinerycms}
  s.authors           = ['Philip Arndt', 'Uģis Ozols', 'Rob Yurkowski']
  s.license           = %q{MIT}
  s.require_paths     = %w(lib)

  s.files             = `git ls-files`.split("\n")
  s.test_files        = `git ls-files -- spec/*`.split("\n")

  s.add_dependency 'refinerycms-core', version
end
