import {Fragment, ReactNode} from 'react';
import Header from './Header';

interface LayoutProps {
    children?: ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <Fragment>
      <Header />
      <main>{children}</main>
    </Fragment>
  );
};

export default Layout;
