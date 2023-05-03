import React from "react";
import { UsersTable } from "../components/UsersTable";

export default {
  title: "Components/UsersTable",
  component: UsersTable,
};

const Template = (args) => <UsersTable {...args} />;

export const DefaultTable = Template.bind({});
DefaultTable.args = {
  users: [
    { id: 0, name: "John", age: 20, gender: "male", occupation: "student", interests: "sports" },
    {
      id: 1,
      name: "Mary",
      age: 26,
      gender: "female",
      occupation: "consultant",
      interests: "cooking, reading",
    },
  ],
};

export const EmptyTable = Template.bind({});
EmptyTable.args = {
  users: [],
};
