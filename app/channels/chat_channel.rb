class ChatChannel < ApplicationCable::Channel
    def subscribed 
        stream_from "chat_channel#{params[:user_id]}" 
    end

    def unsubscribed

    end
end
  