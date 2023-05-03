import "./App.css";
import { Header } from "./components/Header";
import { UserInfoForm } from "./components/UserInfoForm";

function App() {
  const user = {
    id: 0,
    name: "Khoa",
    age: "20",
    gender: "male",
    occupation: "student",
    interests: "sports",
  };

  return (
    <div className="App">
      <Header/>
      <UserInfoForm field={user}/>
    </div>
  );
}

export default App;
