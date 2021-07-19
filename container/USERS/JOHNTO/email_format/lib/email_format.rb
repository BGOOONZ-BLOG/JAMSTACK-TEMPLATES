require 'email_regex'
require 'email_format/version'
require 'email_format/email_format_validator'

module EmailFormat
  def self.valid?(email, strict)
    if strict
      !!(email =~ EmailRegex::EMAIL_ADDRESS_REGEX)
    else
      !!(email =~ /^[\S&&[^@]]+@[\S&&[^@]]+$/)
    end
  end
end
