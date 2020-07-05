export const joinStream = (channel) => {
    
    return (
        $.ajax({
            method: "GET",
            url: `/api/channels/${channel}`,
            data: {channel},
            error: (err) => console.log(err)
        })
    )
}