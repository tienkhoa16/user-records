import "./App.css";
import { UserInfoForm } from "./components/UserInfoForm";

function App() {
  const user = {
    name: "Khoa",
    age: 20,
    gender: "male",
    occupation: "student",
    interests: "sports",
  };

  return (
    <div className="App">
      <UserInfoForm field={user}/>
    </div>
  );
}

export default App;
