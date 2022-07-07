import { Link } from 'react-router-dom';
// import './ProfileCard.scss';

const ProfileCard = ({ profile }) => (
  <Link className="profile-card" to={`/profile/${profile._id}`}>
    <img
      src={
        profile.picture
          ? profile.picture
          : 'https://ik.imagekit.io/p8y8zbsn1/DefaultUserImg_1l2AFbn9k.png?ik-sdk-version=javascript-1.4.3&updatedAt=1657224510614'
      }
      alt={profile.name}
      width="200"
      height="200"
    />
    <span>Creator :</span>
    <span> {profile.name}</span>
    {console.log(profile)}
  </Link>
);

export default ProfileCard;
