import React from "react";

import { Container } from "./styles";

type ErrorAlertProps = {
  icon: JSX.Element;
  message: string;
  style?: React.CSSProperties;
};

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  icon,
  message,
  style,
}) => {
  return (
    <Container style={style}>
      {icon}
      <span>{message}</span>
    </Container>
  );
};
