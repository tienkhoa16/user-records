import React from "react";
import { UserInfoForm } from "../components/UserInfoForm";

export default {
  title: "Components/UserInfoForm",
  component: UserInfoForm,
};

const Template = (args) => <UserInfoForm {...args} />;

export const EmptyForm = Template.bind({});
