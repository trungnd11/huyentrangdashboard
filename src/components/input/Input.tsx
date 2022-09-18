export default function Input(props: {
  onChange?: Function;
  className?: string;
  name?: string;
  id?: string;
  value?: any;
  type?: "text" | "password" | "file" | "radio" | "checkbox" | "number";
  isValid?: boolean;
  placeholder?: string;
  textarea?: boolean;
  style?: React.CSSProperties;
}) {
  const {
    onChange,
    name,
    id,
    className,
    value,
    type,
    isValid,
    placeholder,
    textarea,
    style,
  } = props;
  return (
    <>
      {!textarea ? (
        <input
          type={type || "text"}
          name={name}
          id={id}
          className={`form-control ${className} ${isValid ? "is-invalid" : ""}`}
          placeholder={placeholder || "Nhập dữ liệu"}
          value={value}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            onChange && onChange(e)
          }
          style={style}
        />
      ) : (
        <textarea
          className={`form-control ${className} ${isValid && "is-invalid"}`}
          name={name}
          id={id}
          placeholder={placeholder || "Nhập dữ liệu"}
          value={value}
          onChange={(e) => onChange && onChange(e)}
          style={style}
        />
      )}
    </>
  );
}
