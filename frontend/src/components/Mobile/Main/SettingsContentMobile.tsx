import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../../../store/userSlice";
import LogoutIcon from "@mui/icons-material/Logout";
import ColorLensIcon from "@mui/icons-material/ColorLens";


export const SettingsContentMobile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/");
  };

  return (
    <div className="settings-content-mobile-container">
      <div className="settings-content-mobile-item" onClick={handleLogout}>
        <h4 className="settings-content-mobile-title">Logout</h4>
        <LogoutIcon className="settings-content-mobile-icon" />
      </div>
      <div className="settings-content-mobile-item">
        <h4 className="settings-content-mobile-title">Change Theme</h4>
        <ColorLensIcon className="settings-content-mobile-icon" />
      </div>
    </div>
  );
};
