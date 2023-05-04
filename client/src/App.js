import "./App.css";
import { UsersContextProvider } from "./common/contexts/UsersContext";
import { Header } from "./components/Header";
import { UserInfoForm } from "./components/UserInfoForm";
import { UsersTable } from "./components/UsersTable";

function App() {
  return (
    <div className="App">
      <UsersContextProvider>
        <Header title="User-Record Management" />
        <UserInfoForm />
        <UsersTable />
      </UsersContextProvider>
    </div>
  );
}

export default App;
