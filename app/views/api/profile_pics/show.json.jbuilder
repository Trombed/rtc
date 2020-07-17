json.extract! @user, :id, :username
json.imageURL url_for(@user.photo)

