require "email_trail/version"
require "email_trail/railtie" if defined?(Rails::Railtie)

module EmailTrail
  class Base

    def self.delivering_email(message)
      EmailTrail.create(
        to: message.to.to_s,
        cc: message.cc.to_s,
        bcc: message.bcc.to_s,
        from: message.from.to_s,
        subject: message.subject.to_s,
        body: message.body.to_s
      )
    end
  end
end
