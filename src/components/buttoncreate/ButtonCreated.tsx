
export default function ButtonCreated(prop: { children: string, handleClick?: any }) {
  const { children, handleClick } = prop
  return (
    <button className="btn btn-primary" onClick={handleClick}>
      {children}
    </button>
  );
}
