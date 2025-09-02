import React from "react";
import useNetwork from "../../hooks/useNetwork";

export default function Offline({children}) {
  const isOnline = useNetwork();
if(!isOnline) {
    return children
}
}
