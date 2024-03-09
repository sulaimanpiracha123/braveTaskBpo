import classNames from "classnames";
// import Navbar from "../components/navbars";

const Layout = ({ pageHeading, children }) => {
  return (
    <div className={classNames("w-full h-96 headBg")}>
      {/* <Navbar /> */}
<p>ghhvhgv</p>
      <div className={classNames("flex flex-col gap-6 px-20 mt-6")}>
        <div>
          <h1 className={classNames("text-white font-black text-3xl")}>
            {pageHeading}
          </h1>
        </div>
        <div
          className={classNames(
            "bg-white rounded-xl shadow-md p-4 mb-4 overflow-hidden"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
