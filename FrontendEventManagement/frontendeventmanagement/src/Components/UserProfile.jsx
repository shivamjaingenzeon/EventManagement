import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProfileCard from "./ProfilePage";
import userService from "../Service/user.service";

const UserProfile = (props) => {
  const user = useSelector((store) => store.user);
  const [userDto, setUserDto] = useState({});

  useEffect(function () {
    console.log(user.employeeId);
    userService
      .getprofile(user.employeeId)
      .then((res) => setUserDto(res.data))
      .catch((err) => console.log(err));
    //  console.log("username " + userDto.UserName);
    console.log(userDto.employeeEmail);
  }, []);
  return (
    <div>
      <ProfileCard userDto={userDto} />
    </div>
  );
};

UserProfile.propTypes = {};

export default UserProfile;
