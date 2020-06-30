import React from "react";
import { Link, useHistory } from "react-router-dom";
import { AUTH_TOKEN } from "../constants";
import { IS_LOGGED_IN } from "../queries/isLoggedIn";
import { useQuery, useApolloClient } from "@apollo/client";
import { IsLoggedIn } from "../generated/types";

const Header = () => {
  const history = useHistory();

  const { data } = useQuery<IsLoggedIn>(IS_LOGGED_IN);
  const client = useApolloClient();

  return (
    <div className="flex pa1 justify-between nowrap orange">
      <div className="flex flex-fixed black">
        <div className="fw7 mr1">Hacker News</div>
        <Link to="/" className="ml1 no-underline black">
          new
        </Link>
        <div className="ml1">|</div>
        <Link to="/search" className="ml1 no-underline black">
          search
        </Link>
        {data && data.isLoggedIn && (
          <div className="flex">
            <div className="ml1">|</div>
            <Link to="/create" className="ml1 no-underline black">
              submit
            </Link>
          </div>
        )}
      </div>
      <div className="flex flex-fixed">
        {data && data.isLoggedIn ? (
          <div
            className="ml1 pointer black"
            onClick={() => {
              localStorage.removeItem(AUTH_TOKEN);
              client.writeQuery({
                query: IS_LOGGED_IN,
                data: { isLoggedIn: false },
              });
              history.push("/");
            }}
          >
            logout
          </div>
        ) : (
          <Link to="/login" className="ml1 no-underline black">
            login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
