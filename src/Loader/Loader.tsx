import './loader.scss';

const Loader = (): JSX.Element => {
  return (
    <>
      <div className="loader-background">
        <div className="loader">
          <div className="ball" />
          <div className="ball" />
          <div className="ball" />
        </div>
      </div>
    </>
  );
};

export default Loader;
