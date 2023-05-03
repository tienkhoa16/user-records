import "./App.css";
import { Header } from "./components/Header";
import { UserInfoForm } from "./components/UserInfoForm";
import { UsersTable } from "./components/UsersTable";
import { UsersContextProvider } from "./contexts/UsersContext";

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
      <UsersContextProvider>
        <Header title="User-Record Management" />
        <UserInfoForm field={user} />
        <UsersTable />
      </UsersContextProvider>
    </div>
  );
}

export default App;
