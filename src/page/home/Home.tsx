
export default function Home(prop: { setLogin: any }) {
  return (
    <div>
      Home
      <button onClick={() => prop.setLogin(true)}>Button</button>
    </div>
  );
}
