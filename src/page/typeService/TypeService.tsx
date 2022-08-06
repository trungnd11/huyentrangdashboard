import { useEffect } from "react";

export default function TypeService() {

   useEffect(() => {
     document.title = "Admin - Loại dịch vụ";
   }, []);
  return <div className="container-fluid">TypeService</div>;
}
