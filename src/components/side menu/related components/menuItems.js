import React, { useState, memo } from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import WarningIcon from "@material-ui/icons/Warning";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Import Style
import "./menuItems.scss";

// Import Components
import * as MenuItem from "../../../constants/menu/index";
import ModalCreator from "../../modal creator/modalCreator";
import { WARNING_COLOR } from "../../../constants/colors";

function MenuItems() {
  const DIR = useSelector((state) => state.dir);
  const sideMenu = useSelector((state) => state.sideMenu);
  const { menuTitleEn = "Dashboard", isOpen = false } = sideMenu;
  const dispatch = useDispatch();

  const menuLinks = [
    {
      title:
        DIR.direction === "rtl" ? MenuItem.DASHBOARD_FA : MenuItem.DASHBOARD_EN,
      link: "/dashboard",
      icon: <DashboardIcon />,
      faTitle: MenuItem.DASHBOARD_FA,
      enTitle: MenuItem.DASHBOARD_EN,
    },
    {
      title:
        DIR.direction === "rtl" ? MenuItem.MEMBERS_FA : MenuItem.MEMBERS_EN,
      link: "/members/list",
      icon: <PeopleAltIcon />,
      faTitle: MenuItem.MEMBERS_FA,
      enTitle: MenuItem.MEMBERS_EN,
    },
    {
      title: DIR.direction === "rtl" ? MenuItem.LOGOUT_FA : MenuItem.LOGOUT_EN,
      icon: <ExitToAppIcon />,
    },
  ];

  // Modal Operations
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => {
    setOpenModal(false);
  };
  const handleAccept = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <>
      <ModalCreator
        open={openModal}
        handleClose={handleClose}
        handleAccept={handleAccept}
        acceptText={DIR.direction === "rtl" ? "خروج" : "Logout"}
        cancelText={DIR.direction === "rtl" ? "انصراف" : "cancel"}
      >
        <WarningIcon
          style={{
            color: WARNING_COLOR,
            fontSize: "4rem",
            marginBottom: "32px",
          }}
        />
        <Typography gutterBottom style={{ color: WARNING_COLOR }}>
          {DIR.direction === "rtl"
            ? "برای خروج از سیستم اطمینان دارید؟"
            : "Are You Sure To Logout?"}
        </Typography>
      </ModalCreator>
      <div
        className="menu-links"
        onClick={() => {
          dispatch({
            type: "COLLAPSE",
            payload: true,
          });
        }}
      >
        {menuLinks.map((item, key) => {
          return (
            <Link
              key={key}
              to={item.link && isOpen && item.link}
              className={menuTitleEn === item.enTitle ? "active-link" : ""}
              onClick={() => {
                if (isOpen) {
                  if (!item.link) {
                    setOpenModal(true);
                  } else {
                    dispatch({
                      type: "CHOOSE_TITLE",
                      menuTitleFa: item.faTitle,
                      menuTitleEn: item.enTitle,
                    });
                    dispatch({
                      type: "COLLAPSE",
                      payload: false,
                    });
                  }
                } else {
                  dispatch({
                    type: "COLLAPSE",
                    payload: true,
                  });
                }
              }}
            >
              <ListItem button>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default memo(MenuItems);
