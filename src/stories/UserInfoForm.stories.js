import React from "react";
import { UserInfoForm } from "../components/UserInfoForm";

export default {
  title: "Components/UserInfoForm",
  component: UserInfoForm,
};

const Template = (args) => <UserInfoForm {...args} />;

export const Male = Template.bind({});
Male.args = {
  field: {
    id: 0,
    name: "Khoa",
    age: 20,
    gender: "male",
    occupation: "student",
    interests: "sports",
  },
};

export const Female = Template.bind({});
Female.args = {
  field: {
    id: 1,
    name: "Mary",
    age: 26,
    gender: "female",
    occupation: "consultant",
    interests: "cooking, reading",
  },
};

export const Other = Template.bind({});
Other.args = {
  field: {
    id: 2,
    name: "Sam",
    age: 22,
    gender: "other",
    occupation: "writer",
    interests: "writing",
  },
};
