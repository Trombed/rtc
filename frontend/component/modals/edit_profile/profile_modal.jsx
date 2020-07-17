import React from 'react';


class EditProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            photoURL:  this.props.user[this.props.session.id].imageURL,
            file: null,
            errors: ""

        }
    }

    handleFile(e) {
        if (e.currentTarget.files[0].size > 826048) {
            return this.setState({errors: "File Too Large"})
        }
        let image = URL.createObjectURL(e.currentTarget.files[0])
        this.setState({photoURL: image,
                        errors: "",
                        file: e.currentTarget.files[0]
                    })
     
    }

    handleSubmit(e) {
        e.preventDefault()
        if (!this.state.file) return;
        let formData = new FormData();
        formData.append('user[id]', this.props.session.id)
        formData.append('user[photo]', this.state.file)
        this.props.updateProfile(formData)
            .then( res => this.props.closeModal())
    }

    render() {
        
        return(
            <div className="profile-background"
                onClick={ () => this.props.closeModal()}
            >
                <div className="profile-child" onClick={e => e.stopPropagation()}>
                    <img src={`${this.state.photoURL}`}
                        className="edit-profile-pic"
                        alt="Change Profile Pic"/>
                    <label htmlFor="file-upload" className="profile-file-upload">
                    Custom Upload
                    </label>
                    <input type="file"
                        id="file-upload" 
                        accept="image/*"
                        onChange={ e => this.handleFile(e)}
                    />
                    <div>
                    {this.state.errors}
                    </div>

                    <button
                        onClick={ (e) => this.handleSubmit(e)}
                    >Update</button>
                </div>
            </div>
        )
    }
}

export default EditProfile