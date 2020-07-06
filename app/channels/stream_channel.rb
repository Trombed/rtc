class StreamChannel < ApplicationCable::Channel
    def subscribed
        puts "#{params[:stream_id]}"
      
        stream_from "stream_channel#{params[:stream_id]}"
    end

    def unsubscribed

    end
end