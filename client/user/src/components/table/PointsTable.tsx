import React, { useState } from "react";
import { data } from "../../utils/TableData";

const PointsTable = () => {
  const [contacts, setContacts] = useState(data);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleSearch = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset current page when search changes
  };

  const handlePageClick = (pageNumber: React.SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredContacts = contacts.filter((item) => {
    const fullName = `${item.Title} ${item.Location}`.toLowerCase();
    return fullName.includes(search.toLowerCase());
  });

  const currentContacts = filteredContacts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="max-w-3xl ml-5 sm:min-w-fit ">
      <div className="mb-4">
        <input
          type="text"
          className="border rounded py-2 px-3 w-full"
          onChange={handleSearch}
          placeholder="Search contacts"
        />
      </div>
      {currentContacts.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full  bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="border-b border-gray-300 py-2 px-4">Title</th>
                <th className="border-b border-gray-300 py-2 px-4">Location</th>
                <th className="border-b border-gray-300 py-2 px-4">
                  Orderdate
                </th>
                <th className="border-b border-gray-300 py-2 px-4">
                  Date of your stay
                </th>
                <th className="border-b border-gray-300 py-2 px-4">Cost</th>
              </tr>
            </thead>
            <tbody>
              {currentContacts.map((item, index) => (
                <tr key={index}>
                  <td className="border-b border-gray-300 py-2 px-4">
                    {item.Title}
                  </td>
                  <td className="border-b border-gray-300 py-2 px-4">
                    {item.Location}
                  </td>
                  <td className="border-b border-gray-300 py-2 px-4">
                    {item.Orderdate}
                  </td>
                  <td className="border-b border-gray-300 py-2 px-4">
                    {item.Stay}
                  </td>
                  <td className="border-b border-gray-300 py-2 px-4">
                    {item.Cost}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-center">
            <nav>
              <ul className="pagination flex flex-wrap ">
                {pageNumbers.map((pageNumber) => (
                  <li key={pageNumber} className="page-item  ">
                    <button
                      className={`page-link  border-2 py-3 px-3 ml-2 rounded-md ${
                        pageNumber === currentPage
                          ? " bg-blue-500 text-black dark:text-white"
                          : ""
                      }`}
                      onClick={() => handlePageClick(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      ) : (
        <p className="text-center">No contacts found.</p>
      )}
    </div>
  );
};

export default PointsTable;
