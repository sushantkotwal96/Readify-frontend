import { MainNavigation } from "./MainNavigation";

export const Layout = (props) => {
  return (
    <div>
      <MainNavigation />
      <main>{[props.children]}</main>
    </div>
  );
};
