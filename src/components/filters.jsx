import React from "react";

const Filters = ({ handleFilterChange, fetchUsersByFilter }) => {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Filters</h2>

      {/* Domain Filter */}
      <div className="mb-2">
        <h3 className="font-semibold mb-1">Domain</h3>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            value="Technology"
            name="domain"
            onChange={handleFilterChange}
          />
          <span className="ml-2">Sales</span>
        </label>
        <label className="inline-flex items-center ml-4">
          <input
            type="checkbox"
            value="Finance"
            name="domain"
            onChange={handleFilterChange}
          />
          <span className="ml-2">Finance</span>
        </label>
        <label className="inline-flex items-center ml-4">
          <input
            type="checkbox"
            value="Management"
            name="domain"
            onChange={handleFilterChange}
          />
          <span className="ml-2">Management</span>
        </label>
        <label className="inline-flex items-center ml-4">
          <input
            type="checkbox"
            value="IT"
            name="domain"
            onChange={handleFilterChange}
          />
          <span className="ml-2">IT</span>
        </label>
        <label className="inline-flex items-center ml-4">
          <input
            type="checkbox"
            value="UI Designing"
            name="domain"
            onChange={handleFilterChange}
          />
          <span className="ml-2">UI Designing</span>
        </label>
        <label className="inline-flex items-center ml-4">
          <input
            type="checkbox"
            value="Business Development"
            name="domain"
            onChange={handleFilterChange}
          />
          <span className="ml-2">Business Development</span>
        </label>
        <label className="inline-flex items-center ml-4">
          <input
            type="checkbox"
            value="Marketing"
            name="domain"
            onChange={handleFilterChange}
          />
          <span className="ml-2">Marketing</span>
        </label>
        <label className="inline-flex items-center ml-4">
          <input
            type="checkbox"
            value="Marketing"
            name="domain"
            onChange={handleFilterChange}
          />
          <span className="ml-2">Marketing</span>
        </label>
      </div>

      {/* Gender Filter */}
      <div className="mb-2">
        <h3 className="font-semibold mb-1">Gender</h3>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            value="Male"
            name="gender"
            onChange={handleFilterChange}
          />
          <span className="ml-2">Male</span>
        </label>
        <label className="inline-flex items-center ml-4">
          <input
            type="checkbox"
            value="Female"
            name="gender"
            onChange={handleFilterChange}
          />
          <span className="ml-2">Female</span>
        </label>
        <label className="inline-flex items-center ml-4">
          <input
            type="checkbox"
            value="Polygender"
            name="gender"
            onChange={handleFilterChange}
          />
          <span className="ml-2">Polygender</span>
        </label>
        <label className="inline-flex items-center ml-4">
          <input
            type="checkbox"
            value="Genderqueer"
            name="gender"
            onChange={handleFilterChange}
          />
          <span className="ml-2">Genderqueer</span>
        </label>
      </div>

      {/* Availability Filter */}
      <div className="mb-2">
        <h3 className="font-semibold mb-1">Availability</h3>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            value="Available"
            name="availability"
            onChange={handleFilterChange}
          />
          <span className="ml-2">Available</span>
        </label>
        <label className="inline-flex items-center ml-4">
          <input
            type="checkbox"
            value="Not Available"
            name="availability"
            onChange={handleFilterChange}
          />
          <span className="ml-2">Not Available</span>
        </label>
      </div>
      <button
        className="py-4 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => fetchUsersByFilter()}
      >
        Apply filter
      </button>
    </div>
  );
};

export default Filters;
