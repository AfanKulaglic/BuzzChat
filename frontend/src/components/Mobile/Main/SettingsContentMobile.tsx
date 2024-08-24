import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import EditIcon from "@mui/icons-material/Edit";
import PolicyIcon from '@mui/icons-material/Policy';
import TaskIcon from '@mui/icons-material/Task';
import { Modal, Box, Typography, Button } from "@mui/material";
import { useSettingsLogic } from "../../Hooks/useSettingsLogic";

interface SettingsContentMobileProps {
  userImage: string;
  userId: string;
}

export const SettingsContentMobile: React.FC<SettingsContentMobileProps> = ({ userImage, userId }) => {
  const {
    image,
    openPrivacy,
    openTerms,
    darkMode,
    handleLogout,
    handleImageClick,
    handleFileChange,
    handleOpenPrivacy,
    handleClosePrivacy,
    handleOpenTerms,
    handleCloseTerms,
    toggleDarkMode
  } = useSettingsLogic(userImage, userId);

  return (
    <div className="settings-content-mobile-container">
      <div className="settings-content-mobile-image-container">
        <img
          src={image}
          alt="User"
          className="settings-content-mobile-user-image"
          onClick={handleImageClick}
        />
        <div className="settings-content-mobile-edit-icon">
          <EditIcon onClick={handleImageClick} />
        </div>
      </div>
      <input
        type="file"
        id="fileInput"
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleFileChange}
      />
      <span className="settings-content-mobile-span">Change profile image</span>
      
      <div className="settings-content-mobile-item" onClick={handleOpenPrivacy}>
        <h4 className="settings-content-mobile-title">Privacy Policy</h4>
        <PolicyIcon className="settings-content-mobile-icon" />
      </div>

      <div className="settings-content-mobile-item" onClick={handleOpenTerms}>
        <h4 className="settings-content-mobile-title">Terms of Service</h4>
        <TaskIcon className="settings-content-mobile-icon" />
      </div>

      <div className="settings-content-mobile-item" onClick={toggleDarkMode}>
        <h4 className="settings-content-mobile-title">{darkMode ? "Light Mode" : "Dark Mode"}</h4>
        <ColorLensIcon className="settings-content-mobile-icon" />
      </div>

      <div className="settings-content-mobile-item-logout" onClick={handleLogout}>
        <h4 className="settings-content-mobile-title">Logout</h4>
        <LogoutIcon className="settings-content-mobile-icon" />
      </div>

      <Modal
        open={openPrivacy}
        onClose={handleClosePrivacy}
        aria-labelledby="privacy-policy-modal"
        aria-describedby="privacy-policy-description"
      >
        <Box sx={{ ...modalStyle }}>
          <Typography id="privacy-policy-modal" variant="h6">
            Privacy Policy
          </Typography>
          <Typography id="privacy-policy-description" sx={{ mt: 2 }}>
            At BuzzChat, your privacy is important to us. We collect personal information such as your name, email address, and profile picture, as well as data on your device and usage patterns. We use this information to enhance your experience, improve the app, and communicate with you. We do not share your personal information with third parties unless legally required. You have the right to access, update, or delete your data. Contact us at support@buzzchat.com for more details.
          </Typography>
          <Button onClick={handleClosePrivacy} sx={{ mt: 2 }}>Close</Button>
        </Box>
      </Modal>

      <Modal
        open={openTerms}
        onClose={handleCloseTerms}
        aria-labelledby="terms-of-service-modal"
        aria-describedby="terms-of-service-description"
      >
        <Box sx={{ ...modalStyle }}>
          <Typography id="terms-of-service-modal" variant="h6">
            Terms of Service
          </Typography>
          <Typography id="terms-of-service-description" sx={{ mt: 2 }}>
            By using BuzzChat, you agree to our Terms of Service. You must register to use the app and maintain the confidentiality of your account. Prohibited activities include harassment, sharing illegal content, and hacking. We reserve the right to terminate accounts for violations. BuzzChat is provided "as is" without warranties, and we are not liable for damages resulting from app use. For full terms, please contact us at support@buzzchat.com.
          </Typography>
          <Button onClick={handleCloseTerms} sx={{ mt: 2 }}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
