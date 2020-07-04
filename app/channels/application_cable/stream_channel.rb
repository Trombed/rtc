class StreamChannel < ApplicationCable::Channel
   def subscribed
        stream_from "stream_channel"

    end

    def unsubscribed

    end
end