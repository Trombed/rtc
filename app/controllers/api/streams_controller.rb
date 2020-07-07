class Api::StreamsController < ApplicationController
    def create 
        user = User.find(params[:stream][:user_id])
        if user.stream
            @stream = user.stream
            puts 'stream already exists'
            render :show
        else 
            @stream = Stream.new
            @stream.user_id = params[:stream][:user_id]
            @stream.live = true
            if @stream.save 
                render :index
                broadcast 
                
            else  
                render json: @user.errors.full_messages, status: 422
            end
        end
      end
    
    def index 
        @streams = Stream.all

        render :index
    end 
    
    def broadcast
        @streams = Stream.all
        @json = render_to_string('index.json')
   
     
        ActionCable.server.broadcast("live_channel", JSON.parse(@json))
     
    end

    def destroy 
       
        @stream = Stream.find_by(user_id: params[:stream][:user_id])
        
        if @stream
            @stream.delete 
            broadcast
        else 
            render json: @stream.errors.full_messages, status: 422
        end 

    end



    def stream_params
    params.require(:user).permit(:id, :user_id, :live)
    end
end
