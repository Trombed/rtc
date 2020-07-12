export const sendMessage = (message) => {
    
    return (
        $.ajax({
            method: "POST",
            url: `/api/chats/`,
            data: {message},
        })
    )
}