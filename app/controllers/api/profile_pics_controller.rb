class Api::ProfilePicsController < ApplicationController

    def create
    
        @user = User.find_by(user_params)
        @user.update(picture_params)
        render :show, status: 200
    end



    def user_params
        params.require(:user).permit(:id)
    end

    def picture_params
        params.require(:user).permit(:photo)
    end
end
