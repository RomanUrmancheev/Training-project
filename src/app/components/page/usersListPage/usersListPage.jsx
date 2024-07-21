/* eslint-disable indent */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import GroupList from "../../common/groupList";
import SearchStatus from "../../../components/ui/searchStatus";
import UsersTable from "../../../components/ui/usersTable";
import _ from "lodash";
import SearchForm from "../../common/form/searchForm";
import { useSelector } from "react-redux";
import {
  getProfessions,
  getProfessionsLoadingStatus
} from "../../../store/professions";
import { getCurrentUserId, getUsers } from "../../../store/users";

const UsersListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const professions = useSelector(getProfessions());
  const professionsLoading = useSelector(getProfessionsLoadingStatus());
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
  const [searchData, setSearchData] = useState("");
  const pageSize = 8;
  const currentUserId = useSelector(getCurrentUserId());

  const users = useSelector(getUsers());

  const handleToggleBookMark = (id) => {
    // setUsers(
    //     users.map((user) => {
    //         if (user._id === id) {
    //             return { ...user, bookmark: !user.bookmark };
    //         }
    //         return user;
    //     })
    // );
    console.log(id);
  };

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
    setSearchData("");
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  if (users) {
    function filterUsers(users) {
      const filteredUsers = searchData
        ? users.filter(
            (user) =>
              user.name.toLowerCase().indexOf(searchData.toLowerCase()) !== -1
          )
        : selectedProf
          ? users.filter((user) => user.profession === selectedProf._id)
          : users;
      return filteredUsers.filter((u) => u._id !== currentUserId);
    }

    const filteredUsers = filterUsers(users);

    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

    const handleSearch = ({ target }) => {
      setSelectedProf(undefined);
      setSearchData(target.value);
    };

    const usersCrop = paginate(sortedUsers, currentPage, pageSize);
    const clearFilter = () => {
      setSelectedProf();
    };
    return (
      <div className="d-flex">
        {professions && !professionsLoading && (
          <div className="d-flex flex-column flex-shrink-0 p-5">
            <GroupList
              items={professions}
              selectedItem={selectedProf}
              onItemSelect={handleProfessionSelect}
            />
            <button className="btn btn-secondary mt-2" onClick={clearFilter}>
              Reset filter
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <SearchStatus length={filteredUsers.length} />
          <SearchForm
            name="search"
            value={searchData}
            onChange={handleSearch}
            placeholder="Search..."
          />
          {count > 0 && (
            <UsersTable
              users={usersCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onToggleBookMark={handleToggleBookMark}
            />
          )}
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
  return "loading...";
};
UsersListPage.propTypes = {
  users: PropTypes.array
};

export default UsersListPage;
