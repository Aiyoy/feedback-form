const Error = (props: { children: string }): JSX.Element => {
  return <div className="error-text">{props.children}</div>;
};

export default Error;
