json.array! (@streams) do |stream| 
    json.streamId stream.id
    json.userName stream.user.username
    json.userid stream.user_id    
    
end

