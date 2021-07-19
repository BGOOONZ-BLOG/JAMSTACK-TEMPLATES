# email_trail [![Build Status](https://travis-ci.org/johnotander/email_trail.svg?branch=master)](https://travis-ci.org/johnotander/email_trail)

Automagically store an audit trail of all emails stored in your Rails app.

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'email_trail'
```

```sh
$ bundle
```

## Usage

All emails sent with `ActionMailer` will be automatically intercepted.

#### Installation

```sh
rails g email_trail:install
rake db:migrate
```

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
