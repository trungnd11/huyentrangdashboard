
export default function Content(prop: { children: any }) {
  const { children } = prop;
  return (
    <div className="content-wapper">
      <div className="container-fluid">
        { children }
      </div>
    </div>
  )
}
