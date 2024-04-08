import { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "../components/cards/userCard";
import SearchBar from "../components/searchBar";
import Filters from "../components/filters";
import * as Constant from "../utils/contants";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noUserFounnd, setNoUserFounnd] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    domain: [],
    gender: [],
    availability: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 20;

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    fetchUsersByName(event.target.value);
  };

  const handleFilterChange = (event) => {
    const { name, checked, value } = event.target;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked
        ? [...(prevFilters[name] || []), value] // Initialize as empty array if not present
        : (prevFilters[name] || []).filter((item) => item !== value), // Filter if it's an array
    }));
  };

  const fetchUsersByFilter = async () => {
    try {
      if (
        filters.domain.length === 0 &&
        filters.gender.length === 0 &&
        filters.availability.length === 0
      ) {
        fetchTotalUser();
        fetchUsers();
        return;
      }
      const queryParams = new URLSearchParams(filters).toString();

      const response = await axios.get(
        Constant.apiGateway + `/users/filters?${queryParams}`
      );
      const filterData = await response.data;
      setData(filterData);
      setTotalPages(filterData.length / postsPerPage);
    } catch (error) {
      setNoUserFounnd(true);
      console.error("Error searching for users:", error);
    }
  };

  const fetchUsersByName = async (name) => {
    try {
      if (name === "") {
        fetchTotalUser();
        fetchUsers();
        return;
      }
      const response = await axios.get(
        Constant.apiGateway + `/users/name/${name}`
      );
      const searchData = await response.data;
      setData(searchData);
      setTotalPages(searchData.length / postsPerPage);
    } catch (error) {
      setNoUserFounnd(true);
      console.error("Error searching for users:", error);
    }
  };

  const fetchTotalUser = async () => {
    try {
      const response = await axios.get(Constant.apiGateway + `/users/size`);
      setTotalPages(response.data.count / postsPerPage);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        Constant.apiGateway + `/users?page=${currentPage}`
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchTotalUser();
    fetchUsers();
  }, [currentPage]);

  const handleNextPageChange = (newPage) => {
    console.log("next", newPage);
    if (newPage > totalPages) {
      return;
    }

    setCurrentPage(newPage);
  };

  const handlePrevPageChange = (newPage) => {
    console.log("prev", newPage);
    if (newPage < 1) {
      return;
    }

    setCurrentPage(newPage);
  };

  const handlePageChange = (newPage) => {
    console.log("newPage", newPage);
    setCurrentPage(newPage);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    // Display up to 2 page numbers
    for (
      let i = Math.max(1, currentPage - 1);
      i <= Math.min(currentPage + 1, totalPages);
      i++
    ) {
      pageNumbers.push(
        <p
          key={i}
          className={`text-sm font-medium leading-none cursor-pointer border-t border-transparent pt-3 mr-4 px-2 ${
            i === currentPage
              ? "text-indigo-700 border-indigo-400"
              : "text-gray-600 hover:text-indigo-700 hover:border-indigo-400"
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </p>
      );
    }

    if (currentPage + 1 < totalPages) {
      pageNumbers.push(
        <p
          key="ellipsis"
          className="text-sm font-medium leading-none cursor-pointer border-t border-transparent pt-3 mr-4 px-2 text-gray-600 hover:text-indigo-700 hover:border-indigo-400"
          onClick={() =>
            handlePageChange(Math.min(currentPage + 2, totalPages))
          }
        >
          ...
        </p>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="mx-4">
      {!noUserFounnd && (
        <div className="container mx-auto flex flex-col items-between justify-between">
          <SearchBar
            handleSearchInputChange={handleSearchInputChange}
            searchQuery={searchQuery}
          />
          <Filters
            handleFilterChange={handleFilterChange}
            fetchUsersByFilter={fetchUsersByFilter}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {loading ? (
              <h1>Loading...</h1>
            ) : (
              data.map((user, index) => {
                return <UserCard key={index} userData={user} />;
              })
            )}
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
              <div className="lg:w-3/5 w-full  flex items-center justify-between border-t border-gray-200">
                <div className="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer">
                  <svg
                    width="14"
                    height="8"
                    viewBox="0 0 14 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.1665 4H12.8332"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1.1665 4L4.49984 7.33333"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1.1665 4.00002L4.49984 0.666687"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p
                    className="text-sm ml-3 font-medium leading-none "
                    onClick={() => handlePrevPageChange(currentPage - 1)}
                  >
                    Previous
                  </p>
                </div>
                <div className="flex ">{renderPageNumbers()}</div>
                <div className="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer">
                  <p
                    className="text-sm font-medium leading-none mr-3"
                    onClick={() => handleNextPageChange(currentPage + 1)}
                  >
                    Next
                  </p>
                  <svg
                    width="14"
                    height="8"
                    viewBox="0 0 14 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.1665 4H12.8332"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.5 7.33333L12.8333 4"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.5 0.666687L12.8333 4.00002"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {noUserFounnd && (
        <div className="container mx-auto flex flex-col items-between justify-between">
          <h1 className="text-3xl font-medium text-gray-900 dark:text-gray-800">
            No user found
          </h1>
          <button>
            <a href="/">Back to home</a>
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
