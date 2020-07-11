class ChatsController < ApplicationController

    def create
        ActionCable.server.broadcast("chat_channel", message)
    end
end
