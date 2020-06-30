import React from "react";
import { useQuery } from "@apollo/client";
import { FETCH_LINKS } from "../queries/fetchLinks";
import LinkItem from "./LinkItem";
import { FetchLinksData } from "../generated/types";

const LinkList = () => {
  const { data, loading, error } = useQuery<FetchLinksData>(FETCH_LINKS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>An error occured</div>;

  return (
    <div>
      {data &&
        data.feed.links.map((link: any, index: number) => (
          <LinkItem key={link.id} link={link} index={index} />
        ))}
    </div>
  );
};

export default LinkList;
