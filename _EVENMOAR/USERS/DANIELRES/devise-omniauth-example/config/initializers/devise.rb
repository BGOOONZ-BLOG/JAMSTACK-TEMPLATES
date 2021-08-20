# Use this hook to configure devise mailer, warden hooks and so forth. The first
# four configuration values can also be set straight in your models.

require 'openid/store/filesystem'

Devise.setup do |config|
  # ==> Mailer Configuration
  # Configure the e-mail address which will be shown in DeviseMailer.
  config.mailer_sender = DEVISE_MAILER_FROM

  # Configure the class responsible to send e-mails.
  # config.mailer = "Devise::Mailer"

  # ==> ORM configuration
  # Load and configure the ORM. Supports :active_record (default) and
  # :mongoid (bson_ext recommended) by default. Other ORMs may be
  # available as additional gems.
  require 'devise/orm/active_record'

  # ==> Configuration for any authentication mechanism
  # Configure which keys are used when authenticating an user. By default is
  # just :email. You can configure it to use [:username, :subdomain], so for
  # authenticating an user, both parameters are required. Remember that those
  # parameters are used only when authenticating and not when retrieving from
  # session. If you need permissions, you should implement that in a before filter.
  # config.authentication_keys = [ :email ]

  # Tell if authentication through request.params is enabled. True by default.
  # config.params_authenticatable = true

  # Tell if authentication through HTTP Basic Auth is enabled. True by default.
  # config.http_authenticatable = true

  # Set this to true to use Basic Auth for AJAX requests.  True by default.
  # config.http_authenticatable_on_xhr = true

  # The realm used in Http Basic Authentication
  # config.http_authentication_realm = "Application"

  # ==> Configuration for :database_authenticatable
  # For bcrypt, this is the cost for hashing the password and defaults to 10. If
  # using other encryptors, it sets how many times you want the password re-encrypted.
  config.stretches = 10

  # Define which will be the encryption algorithm. Devise also supports encryptors
  # from others authentication tools as :clearance_sha1, :authlogic_sha512 (then
  # you should set stretches above to 20 for default behavior) and :restful_authentication_sha1
  # (then you should set stretches to 10, and copy REST_AUTH_SITE_KEY to pepper)
  #config.encryptor = :bcrypt

  # Setup a pepper to generate the encrypted password.
  config.pepper = "439ecfc4b47fe22c733da4ac682d1a315d78f3f8a69307e61bad501978e8d5f1db516f1cc96f3a2fcf8f87f63e1860eb27be5208894bf2b5e9b91481febe52ab"

  # ==> Configuration for :confirmable
  # The time you want to give your user to confirm his account. During this time
  # he will be able to access your application without confirming. Default is nil.
  # When confirm_within is zero, the user won't be able to sign in without confirming. 
  # You can use this to let your user access some features of your application 
  # without confirming the account, but blocking it after a certain period 
  # (ie 2 days). 
  # config.confirm_within = 2.days

  # ==> Configuration for :rememberable
  # The time the user will be remembered without asking for credentials again.
  # config.remember_for = 2.weeks

  # If true, a valid remember token can be re-used between multiple browsers.
  # config.remember_across_browsers = true

  # If true, extends the user's remember period when remembered via cookie.
  # config.extend_remember_period = false

  # ==> Configuration for :validatable
  # Range for password length
  # config.password_length = 6..20

  # Regex to use to validate the email address
  # config.email_regexp = /^([\w\.%\+\-]+)@([\w\-]+\.)+([\w]{2,})$/i

  # ==> Configuration for :timeoutable
  # The time you want to timeout the user session without activity. After this
  # time the user will be asked for credentials again.
  # config.timeout_in = 10.minutes

  # ==> Configuration for :lockable
  # Defines which strategy will be used to lock an account.
  # :failed_attempts = Locks an account after a number of failed attempts to sign in.
  # :none            = No lock strategy. You should handle locking by yourself.
  # config.lock_strategy = :failed_attempts

  # Defines which strategy will be used to unlock an account.
  # :email = Sends an unlock link to the user email
  # :time  = Re-enables login after a certain amount of time (see :unlock_in below)
  # :both  = Enables both strategies
  # :none  = No unlock strategy. You should handle unlocking by yourself.
  # config.unlock_strategy = :both

  # Number of authentication tries before locking an account if lock_strategy
  # is failed attempts.
  # config.maximum_attempts = 20

  # Time interval to unlock the account if :time is enabled as unlock_strategy.
  # config.unlock_in = 1.hour

  # ==> Configuration for :token_authenticatable
  # Defines name of the authentication token params key
  # config.token_authentication_key = :auth_token

  # ==> Scopes configuration
  # Turn scoped views on. Before rendering "sessions/new", it will first check for
  # "users/sessions/new". It's turned off by default because it's slower if you
  # are using only default views.
  # config.scoped_views = true

  # Configure the default scope given to Warden. By default it's the first
  # devise role declared in your routes.
  # config.default_scope = :user

  # Configure sign_out behavior. 
  # By default sign_out is scoped (i.e. /users/sign_out affects only :user scope).
  # In case of sign_out_all_scopes set to true any logout action will sign out all active scopes.
  # config.sign_out_all_scopes = false

  # ==> Navigation configuration
  # Lists the formats that should be treated as navigational. Formats like
  # :html, should redirect to the sign in page when the user does not have
  # access, but formats like :xml or :json, should return 401.
  # If you have any extra navigational formats, like :iphone or :mobile, you
  # should add them to the navigational formats lists. Default is [:html]
  # config.navigational_formats = [:html, :iphone]

  # ==> Warden configuration
  # If you want to use other strategies, that are not (yet) supported by Devise,
  # you can configure them inside the config.warden block. The example below
  # allows you to setup OAuth, using http://github.com/roman/warden_oauth
  
  #config.omniauth :facebook, "APP_ID", "APP_SECRET"
  config.omniauth :facebook, FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, :scope => FACEBOOK_APP_PERMISSIONS 
#  config.omniauth :twitter, TWITTER_SECRET_KEY, TWITTER_CONSUMER_KEY
  config.omniauth :twitter, TWITTER_CONSUMER_KEY, TWITTER_SECRET_KEY
  config.omniauth :google_apps, OpenID::Store::Filesystem.new('/tmp'), :domain => 'gmail.com'
  #
  # config.warden do |manager|
  #   manager.oauth(:twitter) do |twitter|
  #     twitter.consumer_secret = <YOUR CONSUMER SECRET>
  #     twitter.consumer_key  = <YOUR CONSUMER KEY>
  #     twitter.options :site => 'http://twitter.com'
  #   end
  #   manager.default_strategies(:scope => :user).unshift :twitter_oauth
  # end
  
  #monkey patch
  
  require 'openid/store/nonce'
  require 'openid/store/interface'
  module OpenID
    module Store
      class Memcache < Interface
        def use_nonce(server_url, timestamp, salt)
          return false if (timestamp - Time.now.to_i).abs > Nonce.skew
          ts = timestamp.to_s # base 10 seconds since epoch
          nonce_key = key_prefix + 'N' + server_url + '|' + ts + '|' + salt
          result = @cache_client.add(nonce_key, '', expiry(Nonce.skew + 5))

          return result #== true (edited 10/25/10)
  #        return !!(result =~ /^STORED/)
        end
      end
    end
  end
  
  class Hash
    def recursive_find_by_key(key)
      # Create a stack of hashes to search through for the needle which
      # is initially this hash
      stack = [ self ]

      # So long as there are more haystacks to search...
      while (to_search = stack.pop)
        # ...keep searching for this particular key...
        to_search.each do |k, v|
          # ...and return the corresponding value if it is found.
          return v if (k == key)

          # If this value can be recursively searched...
          if (v.respond_to?(:recursive_find_by_key))
            # ...push that on to the list of places to search.
            stack << v
          end
        end
      end
    end
  end
end
