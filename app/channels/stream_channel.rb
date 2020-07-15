class StreamChannel < ApplicationCable::Channel
    def subscribed    
        stream_from "stream_channel#{params[:stream_id]}" 
        puts params
    end

    def unsubscribed

    end
end