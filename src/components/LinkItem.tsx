import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { IS_LOGGED_IN } from "../queries/isLoggedIn";
import { VOTE } from "../mutations/vote";
import { timeDifferenceForDate } from "../utils/timeConverter";
import { FETCH_LINKS } from "../queries/fetchLinks";
import { IsLoggedIn } from "../generated/types";

interface Props {
  link: {
    url: string;
    description: string;
    postedBy: {
      name: string;
    };
    createdAt: string;
    index: number;
    id: string;
    votes: Array<any>;
  };
  index: number;
}

const LinkItem: React.FC<Props> = ({ link, index }) => {
  const { data } = useQuery<IsLoggedIn>(IS_LOGGED_IN);
  const [vote] = useMutation(VOTE, {
    update(cache, { data }) {
      const feedData: any = cache.readQuery({ query: FETCH_LINKS });

      const votedLink = feedData.feed.links.find(
        (linkItem: any) => linkItem.id === link.id
      );

      cache.writeQuery({ query: FETCH_LINKS, data });
    },
  });

  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{index + 1}</span>
        {data && data.isLoggedIn && (
          <button
            className="ml1 gray f11"
            onClick={() => {
              vote({ variables: { linkId: link.id } });
            }}
          >
            ▲
          </button>
        )}
      </div>
      <div className="ml1">
        <div>
          {link.description} {link.url}
        </div>
        <div className="f6 lh-copy gray">
          {link.votes.length} votes | by{" "}
          {link.postedBy ? link.postedBy.name : "Unknown"}{" "}
          {timeDifferenceForDate(link.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default LinkItem;
