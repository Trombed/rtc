class StreamChannel < ApplicationCable::Channel
    def subscribed    
        stream_from "stream_channel#{params[:stream_id]}" 
    end

    def unsubscribed

    end
end