class Api::ChannelsController < ApplicationController
    def create
        head :no_content
        
        ActionCable.server.broadcast("stream_channel#{params[:stream_id]}", call_params)
       
        puts ActionCable.server.connections
        puts ActionCable.server.connections.length;
       
    end

    def show 
        @channel = User.find_by(username: params[:channel])
       
        render :show 
    end
    
    private
  
    def call_params
        params.permit(:call, :type, :from, :to, :sdp, :format, :type, :channel, :streamId)
    end
end
