// import { useHistory } from 'react-router-dom';

export const Login: () => JSX.Element = () => {
  // const history = useHistory();

  // const moveLogin = () => {
  //   // TODO
  //   localStorage.setItem("token", "true");
  //   history.push('/device');
  // }

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Button
      </button>
    </>
  );
}