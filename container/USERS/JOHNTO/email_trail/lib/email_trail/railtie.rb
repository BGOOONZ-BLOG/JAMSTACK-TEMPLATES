module EmailTrail
  class Railtie < Rails::Railtie
    initializer "email_trail.register_interceptor" do
      ActiveSupport.on_load :action_mailer do
        ActionMailer::Base.register_interceptor(EmailTrail::Base)
      end
    end
  end
end
