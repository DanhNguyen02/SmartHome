import React from "react";
import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarMenuItem,
  CDBSidebarContent,
  CDBSidebarMenu,
  CDBSidebarFooter,
} from "cdbreact";

import Logo from "../../../../assets/images/logo.png";

function Sidebar() {
  return (
    <CDBSidebar
      textColor="#333"
      backgroundColor="#f0f0f0"
      style={{ height: "100vh" }}
    >
      <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
        <div
          className="container"
          style={{ display: "flex", alignItems: "center" }}
        >
          <img
            src={Logo}
            alt=""
            style={{ width: "40px", borderRadius: "180%", marginRight: "5px" }}
          />
          <h6 className="ml-2">Smart Home</h6>
        </div>
      </CDBSidebarHeader>
      <CDBSidebarContent>
        <CDBSidebarMenu>
          <CDBSidebarMenuItem icon="th-large">Dashboard</CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="sticky-note">
            Task Assignment
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="comment-dots" iconType="solid">
            Message
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="route" iconType="solid">
            Route
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="user" iconType="solid">
            Employees
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="exclamation-circle" iconType="solid">
            Blacklist
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="cog" iconType="solid">
            Setting
          </CDBSidebarMenuItem>
        </CDBSidebarMenu>
      </CDBSidebarContent>
      <CDBSidebarFooter>
        <CDBSidebarMenuItem icon="sign-out-alt" iconType="solid">
          Log out
        </CDBSidebarMenuItem>
      </CDBSidebarFooter>
    </CDBSidebar>
  );
}

export default Sidebar;
