import React from "react";
import { checkRole } from "../../utils/checkRole";
import TH from "../Global/TH";
import TableBody from "./TableBody";

export default function TableContent({ breeds, user }) {
  return (
    <>
      <thead>
        <tr>
          <TH name="ID" />
          <TH name="Nombre" />
          <TH name="Especie" />
          {checkRole(user) === 1 && <TH name="Acciones" />}
        </tr>
      </thead>
      <tbody>
        <TableBody user={user} breeds={breeds} />
      </tbody>
    </>
  );
}
