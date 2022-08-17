import { useState } from "react";
import ReactQuill from "react-quill";

export default function TextEditor() {
  const [editHtml, seteditHtml] = useState("");

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return (
    <div className="container-fluid text-edit px-0 border rounded-2 overflow-hidden">
      <ReactQuill
        onChange={(html: any) => seteditHtml(html)}
        value={editHtml}
        modules={modules}
        formats={formats}
      />
    </div>
  );
}
