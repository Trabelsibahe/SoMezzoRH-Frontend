import React from "react";
import { Button } from "@mui/material";

function RrhAbsArchPage() {
  return (
    <div className="rrh_body2">
      <p className="rrh_info">Archive d'absences</p>
      <Button sx={{ margin: "0.5em 3em" }}
            variant="outlined" href="/rrh">Retour</Button>
      <div style={{ overflowX: "auto" }}>
        <table className="absences_table">
          <tbody>
            <tr>
              <th>Demandeur</th>
              <th>Date de debut d'absence</th>
              <th>Date de fin d'absence</th>
              <th>Type d'absence</th>
              <th>Justification</th>
              <th>Commentaire</th>
              <th>État</th>
            </tr>
            <tr>
              <td>test</td>
              <td>test</td>
              <td>test</td>
              <td>test</td>
              <td>test</td>
              <td>test</td>
              <td>test</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RrhAbsArchPage;
