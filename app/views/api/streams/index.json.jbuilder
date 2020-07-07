json.array! (@streams) do |stream| 
    
    json.id stream.id
    json.userName stream.user.username
    json.user_id stream.user_id    
    
end

