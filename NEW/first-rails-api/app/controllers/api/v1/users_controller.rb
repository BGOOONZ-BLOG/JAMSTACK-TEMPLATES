module Api
  module V1
    # respond_to :json
    # before_action :authenticate_with_token!, only: [:destroy]
    class UsersController < ApplicationController
      # def create
      #   user_password = session_params[:password]
      #   user_email = session_params[:email]
      #   user = User.find_by(email: user_email)
      #   if user && user.valid_password?(user_password)
      #     #sign_in user#, store: false
      #     user.generate_authentication_token!
      #     user.save
      #     render json: user, status: 201, location: @user
      #   else
      #     render json: { errors: ['Invalid email or password'] }, status: 422
      #   end
      # end

      def create
        user = User.new(session_params)
        # user.on_jwt_dispatch
        if user.save
          render json: user, status: 201, location: @user
        else
          render json: { errors: user.errors.full_messages }, status: 422
        end
      end

      def login
        user_password = session_params[:password]
        user_email = session_params[:email]
        user = User.find_by(email: user_email)
        if user && user.valid_password?(user_password)
          #sign_in user#, store: false
          # user.on_jwt_dispatch
          user.save
          render json: user, status: 201, location: @user
        else
          render json: { errors: ['Invalid email or password'] }, status: 422
        end
      end
    
      def destroy
        puts request[:Authorization]
        current_# user.on_jwt_dispatch
        current_user.save
        render json: { message: ["Successfully signed out"] }, status: 204
      end
    
    private
    
      def session_params
        params.permit(:email, :password)
      end
    end
  end
end