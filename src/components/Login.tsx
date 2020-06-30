import React, { useState, useEffect } from "react";
import { AUTH_TOKEN } from "../constants";
import { useMutation, useApolloClient, gql } from "@apollo/client";
import { SIGN_UP } from "../mutations/signUp";
import { SIGN_IN } from "../mutations/signIn";
import { useForm } from "react-hook-form";
import { emailValidationRegEx } from "../utils/emailValidation";
import { useHistory } from "react-router-dom";
import { IS_LOGGED_IN } from "../queries/isLoggedIn";
import { LoginData, MutationLoginArgs } from "../generated/types";

interface FormData {
  email: string;
  password: string;
  name?: string;
}

const Login: React.FC = () => {
  const history = useHistory();
  const [login, setLogin] = useState(true);

  const toggleForm = () => {
    setLogin(!login);
  };

  const { register, handleSubmit, errors } = useForm<FormData>();

  const onFormSubmitSuccess = (res: any) => {
    history.push("/");
  };

  // ***** MUTATIONS ******

  const [sigUp] = useMutation(SIGN_UP, {
    onCompleted: (res) => onFormSubmitSuccess(res),
  });
  const [signIn] = useMutation<LoginData, MutationLoginArgs>(SIGN_IN, {
    update(cache, { data }) {
      if (data?.login.token) {
        localStorage.setItem(AUTH_TOKEN, data.login.token);
        cache.writeQuery({
          query: IS_LOGGED_IN,
          data: { isLoggedIn: true },
        });
        history.push("/");
      }
    },
  });

  const onSubmit = handleSubmit(({ email, password, name }) => {
    if (login) {
      signIn({
        variables: { email, password },
      });
    } else {
      sigUp({
        variables: { email, password, name },
      });
    }
  });

  return (
    <div>
      <h4 className="mv3">{login ? "Login" : "Sign Up"}</h4>
      <form>
        <div className="flex flex-column">
          {!login && (
            <input
              name="name"
              type="text"
              placeholder="Enter your name"
              ref={register({ required: true, maxLength: 16 })}
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            ref={register({ required: true, pattern: emailValidationRegEx })}
          />
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            ref={register({ required: true, maxLength: 20 })}
          />
        </div>
      </form>
      <div className="flex mt3">
        <div className="pointer mr2 button" onClick={onSubmit}>
          {login ? "login" : "create account"}
        </div>
        <div className="pointer button" onClick={toggleForm}>
          {login ? "need to create an account?" : "already have an account?"}
        </div>
      </div>
    </div>
  );
};

export default Login;
