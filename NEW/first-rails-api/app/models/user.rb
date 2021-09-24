class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: JWTBlacklist

  def on_jwt_dispatch
    begin
      self.apikey = Devise.jwt_token
    end while self.class.exists?(apikey: apikey)
  end
end
