import { Link } from 'react-router-dom';
// import './ProfileCard.scss';

const ProfileCard = ({ profile }) => (
  <Link className="profile-card" to={`/profile/${profile._id}`}>
    <img
      src={
        profile.picture ? profile.picture : './../../public/DefaultUserImg.png'
      }
      alt={profile.name}
    />
    <span>{profile.name}</span>
  </Link>
);

export default ProfileCard;
