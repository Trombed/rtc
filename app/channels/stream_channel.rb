class StreamChannel < ApplicationCable::Channel
   def subscribed
        stream_from "stream_channel_#{params[:stream_channel]}"

        puts "stream from  #{params[:stream_channel]}"

    end

    def unsubscribed

    end
end