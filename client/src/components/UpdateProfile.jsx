import { useAuth } from "../contexts/AuthContext";
import { Select, message, Input } from "antd";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
const UpdateProfile = () => {
  const { user } = useAuth();
  console.log(user);
  const [formData, setFormData] = useState({
    name: user.name,
    classname: user.classname,
    grade: user.grade,
    avatar_url: user.avatar_url,
    cover_image_url: user.cover_image_url,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="w-screen h-screen bg-[#e7e5e4]">
        <div className="bg-white h-14 flex items-center justify-between">
          <div className="font-bold text-[20px] leading-5 pl-6">HEDSOCIAL</div>
          <div className="flex mr-10">
            <img
              src={user?.avatar_url ? user.avatar_url : "/social-media.png"}
              alt="user"
              width={20}
              height={20}
              className="mr-2"
            ></img>
            <span className="font-bold">{user?.name}</span>
          </div>
        </div>
        <div className="create post w-3/5 h-[90%] mx-auto mt-4">
          <div className="text-3xl">Update Profile</div>
          <div className="h-1 bg-white my-4"></div>
          <div className="bg-white h-[90%] px-8 py-4 rounded-lg">
            <div className=" mx-auto">
              <div>
                Name <span className="text-red-600">*</span>
              </div>
              <Input
                type="text"
                className="my-2"
                value={user.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className=" mx-auto">
              <div>
                Grade <span className="text-red-600">*</span>
              </div>
              <Select
                style={{
                  width: "100%",
                  height: "100%",
                  paddingTop: "0.5rem",
                  paddingBottom: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                }}
                defaultValue={{ value: user.grade, label: user.grade }}
                onSelect={(value) => setFormData({ ...formData, grade: value })}
                options={[
                  { value: "K63", label: "K63" },
                  { value: "K64", label: "K64" },
                  { value: "K65", label: "K65" },
                  { value: "K66", label: "K66" },
                  { value: "K67", label: "K67" },
                  { value: "K68", label: "K68" },
                ]}
              />
            </div>

            <div className=" mx-auto">
              <div>
                Class <span className="text-red-600">*</span>
              </div>
              <Select
                style={{
                  width: "100%",
                  height: "100%",
                  paddingTop: "0.5rem",
                  paddingBottom: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                }}
                defaultValue={{ value: user.classname, label: user.classname }}
                onSelect={(value) =>
                  setFormData({ ...formData, classname: value })
                }
                options={[
                  { value: "Việt Nhật 01", label: "Việt Nhật 01" },
                  { value: "Việt Nhật 02", label: "Việt Nhật 02" },
                  { value: "Việt Nhật 03", label: "Việt Nhật 03" },
                  { value: "Việt Nhật 04", label: "Việt Nhật 04" },
                  { value: "Việt Nhật 05", label: "Việt Nhật 05" },
                ]}
              />
            </div>
            <div>
              <div>Avatar <EditOutlined/></div> 
              <div>
                <img src={user.avatar_url} alt="avatar" width={24} height={24}></img>
              </div>
            </div>
            <div className="flex items-center text-center justify-end">
              <button
                to="/"
                className="bg-[#0e64d2] text-white rounded-lg px-4 py-2"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
export default UpdateProfile;
