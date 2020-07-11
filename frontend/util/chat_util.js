export const sendMessage = (message) => {
    
    return (
        $.ajax({
            method: "GET",
            url: `/api/chats/`,
            data: {channel},
        })
    )
}