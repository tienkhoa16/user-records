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
      <h1>User-Record Management</h1>
      <UserInfoForm field={user}/>
    </div>
  );
}

export default App;
