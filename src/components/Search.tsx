import React, { useState, ChangeEvent } from "react";
import LinkItem from "./LinkItem";
import { useLazyQuery } from "@apollo/client";
import { FEED_SEARCH_QUERY } from "../queries/feedSearch";

const Search: React.FC = () => {
  const [filter, setFilter] = useState("");
  const [links, setLinks] = useState<any>([]);

  const [search, { called, loading, data }] = useLazyQuery(FEED_SEARCH_QUERY);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    search({
      variables: {
        filter: e.target.value,
      },
    });
  };

  return (
    <div>
      <div>
        Search
        <input type="text" value={filter} onChange={handleInputChange} />
        <button>OK</button>
      </div>
      {data &&
        !loading &&
        links.map((link: any, index: number) => (
          <LinkItem key={link.id} link={link} index={index} />
        ))}
      <div></div>
    </div>
  );
};

export default Search;
