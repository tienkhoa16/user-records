import React from "react";
import { UsersTableModel } from "../components/UsersTableModel";

export default {
  title: "Components/UsersTableModel",
  component: UsersTableModel,
};

const Template = (args) => <UsersTableModel {...args} />;

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
