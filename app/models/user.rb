# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  email           :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord

    validates :username, :password_digest, :session_token, :email, presence: true
    validates :password, length: { minimum: 6 }, allow_nil: true 
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
    after_initialize :ensure_session_token, :ensure_photo
    
    attr_reader :password 

    has_one :stream,
    foreign_key: :user_id,
    class_name: :Stream

    has_one_attached :photo



    def self.find_by_credentials(username, password)
        user = User.find_by(username: username)
        user && user.is_password?(password) ? user : nil
      end
    
      def password=(password) 
        @password = password
        self.password_digest = BCrypt::Password.create(password)
      end
    
      def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
      end
    
      def reset_session_token!
        self.session_token = SecureRandom.urlsafe_base64(16)
        self.save!
        self.session_token
      end
    
      def ensure_session_token
        self.session_token ||= SecureRandom.urlsafe_base64(16)
      end

      def ensure_photo
        unless self.photo.attached?
          photo = open('https://eric-rtc-dev.s3-us-west-1.amazonaws.com/anon.png')
          self.photo.attach(io: photo, filename: "default.png")
        end
    
      end



    

end
