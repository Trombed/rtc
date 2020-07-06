class Api::ChannelsController < ApplicationController
    def create
        head :no_content
        puts '-------------------'
        puts params
        puts '-------------------'
        ActionCable.server.broadcast("stream_channel#{params[:stream_Id]}", call_params)
       

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
