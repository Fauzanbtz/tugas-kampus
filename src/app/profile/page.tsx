"use client"

import React from "react";
import { verifyToken } from "@/lib/jwt";

export default function Profile() {
  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          const data = await verifyToken(
            "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZXhwIjoxNzI5MTc4MDA2fQ.LgXHEN6RT2pwXe9y_NJG9H31bnBxmWE4nfE49j1ZYXU"
          );
          console.log(data);
        }}>
        <button type="submit">test</button>
      </form>
    </div>
  );
}
