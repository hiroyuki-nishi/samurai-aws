import { useHistory } from "react-router-dom";

interface HeaderProps {
  visible: boolean 
}

export const Header = (props: HeaderProps) => {
  const history = useHistory();

  return props.visible ? (
    <>
    <h1>Header</h1>
    <ul>
      <li onClick={() => history.push("/loop")}>Loop</li>
    </ul>
    </>
  ) : (<></>);
}
