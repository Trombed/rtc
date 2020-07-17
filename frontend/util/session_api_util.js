const APIUtil = {
    signup: (user) => (
      $.ajax({
        method: "POST",
        url: "/api/users",
        data: { user }
      })
    ),
  
    login: (user) => {
      return $.ajax({
        method: "POST",
        url: "/api/session",
        data: { user }
      })
    },
  
    logout: () => (
      $.ajax({
        method: "DELETE",
        url: "/api/session"
      })
    ),

    update: (formData) => {

      return (
      $.ajax({
        method: "POST",
        url: `/api/profile_pics/`,
        data: formData,
        contentType: false,
        processData: false
      }))
    },

    demoLogin: () => {

      return $.ajax({
      method: "POST",
      url: "/api/session",
      data: { 
        user: {
          username: 'admin',
          password: 'admin1'
        }
      }
      })
    }

  }


  
  export default APIUtil;