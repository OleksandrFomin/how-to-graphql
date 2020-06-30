import React from "react";
import { useMutation } from "@apollo/client";
import { ADD_LINK } from "../mutations/addLink";

import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FETCH_LINKS } from "../queries/fetchLinks";
import { MutationPostData, MutationPostArgs } from "../generated/types";

type FormData = {
  url: string;
  description: string;
};

const CreateLink = () => {
  const history = useHistory();
  const [addLink, { data }] = useMutation<MutationPostData, MutationPostArgs>(
    ADD_LINK
  );

  const { register, handleSubmit, errors } = useForm<FormData>();
  const onSubmit = handleSubmit(({ url, description }) => {
    addLink({
      variables: { url, description },
      update(cache, { data }) {
        const newFeedItem = data?.post;
        const existingFeedItems: any = cache.readQuery({
          query: FETCH_LINKS,
        });
        cache.writeQuery({
          query: FETCH_LINKS,
          data: { feed: existingFeedItems.feed.links.concat(newFeedItem) },
        });
      },
    });
  });

  if (data && data.post.id) {
    history.push("/");
  }

  return (
    <div>
      <h5>Create new link</h5>
      <form onSubmit={onSubmit}>
        <label>URL</label>
        <input name="url" ref={register} />
        <label>Last Name</label>
        <input name="description" ref={register} />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default CreateLink;
