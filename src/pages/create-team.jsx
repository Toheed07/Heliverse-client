import { useSelector } from "react-redux";
import UserCard from "../components/cards/userCard";
import axios from "axios";
import * as Constant from "../utils/contants";
import { useNavigate } from "react-router-dom";


const Team = () => {
  const navigate = useNavigate();
  const usersInTeam = useSelector((state) => state.team.teams);
  console.log(usersInTeam);

  const handleTeamCreate = async () => {
    console.log("Creating team");
    const name = prompt('Enter team name');
    const userIds = usersInTeam.map((user) => user._id);
    try {
      // Check if team name is provided
      if (!name) {
        throw new Error('Team name is required');
      }
  
      // Check if userIds are provided and it's an array with at least one user ID
      if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
        throw new Error('At least one user is required to create a team');
      }
  
      // Create the new team
      const response = await axios.post(Constant.apiGateway + '/teams', { name, userIds });
      console.log('Team created:', response.data);
      alert('Team created successfully');
      navigate('/teams');
    } catch (error) {
      console.error('Error creating team:', error.message);
      throw error;
    }
  };
  
  return (
    <div className="mx-4">

    
      <div className=" py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {usersInTeam.map((user, index) => {
          return <UserCard key={index} userData={user} />;
        })}
      </div>
      {usersInTeam.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-800">
          No users in team
        </div>
      )}
      {usersInTeam.length > 0 && (
        <button
        className="text-white font-bold bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        onClick={() => handleTeamCreate()}
      >
        Create team
      </button>
      )}

    </div>
  );
};

export default Team;
