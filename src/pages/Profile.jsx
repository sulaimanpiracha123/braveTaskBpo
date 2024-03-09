import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import classNames from "classnames";
import { HiUserCircle } from "react-icons/hi";
import { HiMail } from "react-icons/hi";
import { HiCalendar } from "react-icons/hi";
import { HiLocationMarker } from "react-icons/hi";
import { HiOutlinePhone } from "react-icons/hi";
import { HiOutlineLockClosed } from "react-icons/hi";
import Layout from "../layouts/Default";
import GoogleMaps from "../components/GoogleMaps";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      title: <HiUserCircle className={classNames("w-10 h-10")} />,
      content: (
        <div className={classNames("text-center ")}>
          {" "}
          <span>
            Hi My Name is <br />
          </span>
          <p className={classNames("text-2xl	")}>
            {user?.name?.title +
              " " +
              user?.name?.first +
              "" +
              user?.name?.last}
          </p>
        </div>
      ),
    },
    {
      title: <HiMail className={classNames("w-10 h-10")} />,
      content: (
        <div className={classNames("text-center")}>
          <span className="text-center ">
            My Email Address is <br />
          </span>
          <p className={classNames("text-2xl	")}>{user?.email}</p>
        </div>
      ),
    },
    {
      title: <HiCalendar className={classNames("w-10 h-10")} />,
      content: (
        <div className={classNames("text-center")}>
          <span>
            My BirthDay is <br />
          </span>
          <p className={classNames("text-2xl")}>{user?.dob?.date}</p>
        </div>
      ),
    },
    {
      title: <HiLocationMarker className={classNames("w-10 h-10")} />,
      content: (
        <div className={classNames("text-center")}>
          <span>
            My address is <br />{" "}
          </span>
          <p className={classNames("text-2xl	")}>
            {user?.location?.postcode + " " + user?.location?.country}
          </p>
        </div>
      ),
    },
    {
      title: <HiOutlinePhone className={classNames("w-10 h-10")} />,
      content: (
        <div className={classNames("text-center")}>
          <span>
            My Phone Number is
            <br />
          </span>
          <p className={classNames("text-2xl	")}>{user?.phone}</p>
        </div>
      ),
    },
    {
      title: <HiOutlineLockClosed className={classNames("w-10 h-10")} />,
      content: (
        <div className={classNames("text-center")}>
          <span>
            My password is
            <br />
          </span>
          <p className={classNames("text-2xl")}>{user?.login?.password}</p>
        </div>
      ),
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://randomuser.me/api/?seed=${id}`
        );
        setUser(response?.data?.results[0]);
        console.log("Data--->", response?.data?.results);

        console.log(response.data);
      } catch (error) {
        console.error("Data fetch failed:");
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, [id]);
  const userLocation = {
    lat: user?.coordinates?.latitude,
    lng: user?.coordinates?.longitude,
  };
  return (
    <Layout pageHeading="Profile">
      <div>
        {user && (
          <div>
            <div
              className={classNames(
                "flex -space-x-1 overflow-hidden justify-center"
              )}
            >
              <img
                className="inline-block h-20 w-20 rounded-full ring-2 ring-white justify-center text-align center"
                src={user?.picture?.medium}
                alt=""
              />
            </div>
            <div className=" flex justify-center mt-5">
              <div>
                <div className="p-4">{tabs[activeTab].content}</div>
              </div>
            </div>
            <div className="flex justify-center mt-4 px-3">
              <div className="border border-gray-300 rounded-lg">
                <div className="flex">
                  {tabs.map((tab, index) => (
                    <button
                      key={index}
                      className={`py-2 px-4 ${
                        activeTab === index
                          ? "bg-sky-500 hover:bg-sky-700 - text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                      onClick={() => setActiveTab(index)}
                    >
                      {tab.title}
                    </button>
                  ))}
                </div>
              </div>{" "}
            </div>
          </div>
        )}
      </div>
      {/* Location */}
      <div>
        <h2>Location</h2>
        <GoogleMaps apiKey=" " center={userLocation} zoom={10} />
      </div>
      <div>
      </div>
    
    </Layout>
  );
};
export default Profile;
