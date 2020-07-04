const streamAPIUtil = {
    streamOn: (stream) => {
        
    return (
      $.ajax({
        method: "POST",
        url: `/api/streams/`,
        data: { stream }
      })
    )},
    streamOff: (stream) => {
        
    return (
      $.ajax({
        method: "DELETE",
        url: `/api/streams/${stream.user_id}`,
        data: { stream }
      })
    )},
    streamChannels: () => {
        
    return (
      $.ajax({
        method: "GET",
        url: `/api/streams/`
      })
    )},
}

export default streamAPIUtil