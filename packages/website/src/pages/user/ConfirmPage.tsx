import React from 'react';
import * as steps from './signup/steps';
import { useHistory, Link } from "react-router-dom";

interface ConfirmPageNavState {
  username: string
}

export default function LoginPage() {

  const history = useHistory<ConfirmPageNavState>();

  return (
    <steps.VerificationForm onSubmit={async (vc) => {

    }} username={history.location.state.username} />
  );
}