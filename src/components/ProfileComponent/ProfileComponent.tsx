
import "./ProfileComponent.scss";

const ProfileComponent = () => {

    return (
        <div className="profile">
            <img
                src="img/notificacion.png"
                alt="notificacion"
                className="Profile__notification"
            />
            <img src="img/perfil.png" alt="perfil" className="profile__icon" />
        </div>
    );
};

export default ProfileComponent;