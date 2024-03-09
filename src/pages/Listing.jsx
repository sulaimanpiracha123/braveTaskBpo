import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import Layout from "../layouts/Default";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";

const TABLE_HEAD = [
  "Gender",
  "Name",
  "Image",
  "Location",
  "City",
  "State",
  "Country",
  "PostCode",
  "TimeZone",
  "View",
];

const Listing = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [genderFilter, setGenderFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = 10; // Total number of pages

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // You can perform any action here, like fetching data for the new page
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://randomuser.me/api/?results=50"
        );
        setData(response.data.results);
        setFilteredData(response.data.results);

        console.log("Data--->", response?.data?.results);

        console.log(response.data);
      } catch (error) {
        // Handle errors, e.g., display an error message to the user
        console.error(
          "Data fetch failed:"
          // error.response ? error.response.data.message : error.message
        );
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []);
  const handleGenderFilterChange = (event) => {
    const selectedGender = event.target.value;
    setGenderFilter(selectedGender);
    filterData(selectedGender);
  };
  const filterData = (selectedGender) => {
    if (selectedGender === "all") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) => item.gender === selectedGender);
      setFilteredData(filtered);
    }
  };
  return (
    <Layout pageHeading="Listing">
      <select
        name="gender"
        onChange={handleGenderFilterChange}
        value={genderFilter}
      >
        <option value="">All</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <table className="w-full table-fixed">
        <div className="flex justify-end mb-2"></div>
        <thead>
          <tr className="bg-gray-100">
            {TABLE_HEAD.map((head) => (
              <th className="rounded-tl-md px-2.5 py-2.5 text-left">{head}</th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {filteredData?.map((item) => (
            <tr>
              <td className="py-4 border-b border-gray-200">{item.gender}</td>
              <td className="py-4 border-b border-gray-200">
                {item.name.title + " " + item.name.first + " " + item.name.last}
              </td>
              <td className="py-4 border-b border-gray-200">
                <img
                  src={item.picture.thumbnail}
                  className="w-10 h-10 rounded"
                  alt="userThumbnail"
                />
              </td>
              <td className="py-4 border-b border-gray-200">
                {item.location.street.name}
              </td>
              <td className="py-4 border-b border-gray-200">
                {item.location.city}
              </td>
              <td className="py-4 border-b border-gray-200">
                {item.location.state}
              </td>
              <td className="py-4 border-b border-gray-200">
                {item.location.country}
              </td>
              <td className="py-4 border-b border-gray-200">
                {item.location.postcode}
              </td>
              <td className="py-4 border-b border-gray-200">
                {item.location.timezone.description}
              </td>
              <td className="py-4 border-b border-gray-200">
                <Link
                  to={`/profile/${item.login.uuid}`}
                  className="justify-content-center align-item-cente"
                >
                  <FaEye />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Layout>
  );
};

export default Listing;
