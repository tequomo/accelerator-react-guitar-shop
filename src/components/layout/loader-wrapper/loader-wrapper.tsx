import Loader from '../../loader/loader';

type LoaderWrapperProps = {
  isLoad: boolean,
  children: JSX.Element,
}

function LoaderWrapper({ isLoad, children }: LoaderWrapperProps): JSX.Element {
  return (isLoad && children) || <Loader />;
}

export default LoaderWrapper;
