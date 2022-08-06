import { useEffect } from "react";

export default function Experience() {

  useEffect(() => {
    document.title = "Admin - Kinh nghiệm";
  }, []);

  return <div className="container-fluid">Experience</div>;
}
