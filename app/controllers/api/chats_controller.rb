class Api::ChatsController < ApplicationController

    def create
        head :no_content
        puts params
        ActionCable.server.broadcast("chat_channel_#{params[:message][:chatId]}", params[:message])
    end


end
