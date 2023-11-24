import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./layouts/SearchBar";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { Button, Dropdown, Space, } from 'antd';
import { DownOutlined} from '@ant-design/icons';
const Header = () => {
  const authInfo = useAuth();
  const navigate = useNavigate();
  const {user, isLoggedIn, logout } = authInfo
    ? authInfo
    : { isLoggedIn: false, logout: () => {} };
  const [userData, setUserData] = useState()
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/user/${user?.name}`)
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error("Failed to fetch user");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchUser();
  }
  , []);
  const handleMenuClick = (e) => {
    switch (e.key) {
      case '1': 
        navigate('/profile');
        break;
      case '2':
        logout();
        break;
      default:
        break;
    }
  };
  const items = [
    {
      label: 'Profile',
      key: '1',
    },
    {
      label: 'Log out',
      key: '2',
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <>
      <div className="bg-white h-14 flex items-center sticky top-0">
        <div className="font-bold text-[20px] leading-5 pl-6">HEDSOCIAL</div>
        <div className="w-1/6 px-1 py-1.5 mx-10 flex items-center text-center">
          <Link
            to="/"
            className="w-1/2 bg-[#eeeeee] rounded-lg px-1 py-1.5 text-[#0079D3] font-bold text-[15px] mr-2"
          >
            HOME
          </Link>
          <Link
            to=""
            className="w-1/2 font-bold text-[15px] text-black opacity-50"
          >
            VIDEO CALL
          </Link>
        </div>
        <SearchBar />
        <div className="flex items-center text-center w-1/6">
          {isLoggedIn ? (
            <div className="flex items-center justify-center">
              <Space wrap>
                <Dropdown menu={menuProps} className="border-0 shadow-none">
                  <Button>
                    <Space>
                      <img
                        src={userData?.avatar_url ? userData.avatar_url : "/social-media.png"}
                        alt="user"
                        width={24}
                        height={24}
                        className="mr-2"
                      />
                      <span className="font-bold mr-4">{userData?.name}</span>
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>
              </Space>
              {/* <button
                className="bg-[#0e64d2] text-white rounded-lg px-4 py-2"
                onClick={logout}
              >
                Logout
              </button> */}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-[#0e64d2] text-white rounded-lg px-4 py-2"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
export default Header;
