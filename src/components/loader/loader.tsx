import './loader.css';

function Loader(): JSX.Element {
  return (
    <div className="loader" data-testid="loader"><div className="lds-dual-ring" /></div>
  );
}

export default Loader;
