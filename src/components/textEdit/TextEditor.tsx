import { useCallback, useState } from "react";
import ReactQuill from "react-quill";

export default function TextEditor(props: { onEdit?: Function }) {
  const { onEdit } = props;
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

  const handleChangeText = useCallback(
    (html: string) => {
      seteditHtml(pre => html);
      onEdit && onEdit(editHtml);
    },
    [editHtml, onEdit],
  )

  return (
    <div className="container-fluid text-edit px-0">
      <ReactQuill
        onChange={handleChangeText}
        value={editHtml}
        modules={modules}
        formats={formats}
      />
    </div>
  );
}
