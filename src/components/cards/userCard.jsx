import PropTypes from "prop-types";
import { useDispatch } from 'react-redux';
import { addItemToTeam } from '../../redux/team';


const UserCard = ({ userData }) => {
  const dispatch = useDispatch();

  const handleAddToTeam = () => {
    dispatch(addItemToTeam(userData));
    console.log("Adding user to team:", userData);
  };

  return (
    <div>
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center pb-10">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={userData.avatar}
            alt="user image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {userData.id}
          </h5>
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {userData.first_name} {userData.last_name}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {userData.email}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {userData.gender}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {userData.domain}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {userData.available ? "Available" : "Not Available"}
          </span>
          <button
            type="button"
            className="text-white font-bold bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            onClick={handleAddToTeam}
          >
            Add to team
          </button>
        </div>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  userData: PropTypes.object.isRequired,
};

export default UserCard;
