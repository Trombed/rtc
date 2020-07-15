class ChatChannel < ApplicationCable::Channel
    def subscribed 
        stream_from "chat_channel_#{params[:chatId]}" 
        puts "chat_channel_#{params[:chatId]}"
    end

    

    def unsubscribed

    end
end
  