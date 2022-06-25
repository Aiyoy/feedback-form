import './toast.scss';

const Toast = (props: {message: string}): JSX.Element => {
  return (
    <>
      <div className="toast-container">
        <div className="toast">{props.message}</div>
      </div>
    </>
  );
};

export default Toast;