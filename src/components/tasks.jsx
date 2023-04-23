import React from "react";
import { Button, IconButton } from "@mui/material";
import "../assets/styles/tasks.css";
import InsertInvitationOutlinedIcon from "@mui/icons-material/InsertInvitationOutlined";
import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";
import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";
import AddIcon from "@mui/icons-material/Add";

import Add_Task_Modal from "./task_modal";

function Tasks() {
  return (
    <div>
      <div className="tasks_grid">
        <div className="tasks_grid_item">
          <div className="task_card">
            <div className="task_menu">
              <IconButton size="small">
                <MoreHorizTwoToneIcon />
              </IconButton>
            </div>
            <p className="task_name">Friendly Painter</p>
            <p className="task_desc">
              Within the exercise, we design aroom in a scandinavian style.
            </p>
            <div className="task_info">
              <i>
                <HelpCenterOutlinedIcon />
              </i>
              <span>Priorité: Optionnel</span>
            </div>{" "}
            <div className="task_info">
              <i>
                <InsertInvitationOutlinedIcon />
              </i>
              <span>Date: 25/04/2023</span>
            </div>
            <div></div>
          </div>
        </div>
        <div className="tasks_grid_item">
          <div className="task_card">
            <div className="task_menu">
              <IconButton size="small">
                <MoreHorizTwoToneIcon />
              </IconButton>
            </div>
            <p className="task_name">Friendly Painter</p>
            <p className="task_desc">
              Within the exercise, we design aroom in a scandinavian style.
            </p>
            <div className="task_info">
              <i>
                <HelpCenterOutlinedIcon />
              </i>
              <span>Priorité: Optionnel</span>
            </div>{" "}
            <div className="task_info">
              <i>
                <InsertInvitationOutlinedIcon />
              </i>
              <span>Date: 25/04/2023</span>
            </div>
            <div></div>
          </div>
        </div>
        <div className="tasks_grid_item">
          <div className="task_card">
            <div className="task_menu">
              <IconButton size="small">
                <MoreHorizTwoToneIcon />
              </IconButton>
            </div>
            <p className="task_name">Friendly Painter</p>
            <p className="task_desc">
              Within the exercise, we design aroom in a scandinavian style.
            </p>
            <div className="task_info">
              <i>
                <HelpCenterOutlinedIcon />
              </i>
              <span>Priorité: Optionnel</span>
            </div>{" "}
            <div className="task_info">
              <i>
                <InsertInvitationOutlinedIcon />
              </i>
              <span>Date: 25/04/2023</span>
            </div>
            <div></div>
          </div>
        </div>
        <div className="tasks_grid_item">
          <div className="task_card">
            <div className="task_menu">
              <IconButton size="small">
                <MoreHorizTwoToneIcon />
              </IconButton>
            </div>
            <p className="task_name">Friendly Painter</p>
            <p className="task_desc">
              Within the exercise, we design aroom in a scandinavian style.
            </p>
            <div className="task_info">
              <i>
                <HelpCenterOutlinedIcon />
              </i>
              <span>Priorité: Optionnel</span>
            </div>{" "}
            <div className="task_info">
              <i>
                <InsertInvitationOutlinedIcon />
              </i>
              <span>Date: 25/04/2023</span>
            </div>
            <div></div>
          </div>
        </div>
        <div className="tasks_grid_item">
          <div className="task_card">
            <div className="task_menu">
              <IconButton size="small">
                <MoreHorizTwoToneIcon />
              </IconButton>
            </div>
            <p className="task_name">Friendly Painter</p>
            <p className="task_desc">
              Within the exercise, we design aroom in a scandinavian style.
            </p>
            <div className="task_info">
              <i>
                <HelpCenterOutlinedIcon />
              </i>
              <span>Priorité: Optionnel</span>
            </div>{" "}
            <div className="task_info">
              <i>
                <InsertInvitationOutlinedIcon />
              </i>
              <span>Date: 25/04/2023</span>
            </div>
            <div></div>
          </div>
        </div>
        <div className="tasks_grid_item">
          <Add_Task_Modal />
        </div>
      </div>
    </div>
  );
}

export default Tasks;
