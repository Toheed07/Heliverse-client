import { useEffect, useState } from "react";
import axios from "axios";
import * as Constant from "../utils/contants";

const Team = () => {
  const [data, setData] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(Constant.apiGateway + `/teams`);
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div>
      {data.map((team, index) => {
        return (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            key={index}
          >
            <h1>Team Name: {team.name}</h1>
            <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
              User numbers
              {team.users.map((user, index) => {
                return <li key={index}>{user}</li>;
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Team;
