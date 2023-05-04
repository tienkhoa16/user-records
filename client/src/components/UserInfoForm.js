import React from "react";
import "./user-info-form.css";
import { Button } from "./Button";
import axios from "axios";
import { useUsersContext } from "../common/contexts/UsersContext";
import { removeWhitespaces } from "../common/utils/utils";

export const UserInfoForm = () => {
  const {
    formId,
    formName,
    setFormName,
    formAge,
    setFormAge,
    formGender,
    setFormGender,
    formOccupation,
    setFormOccupation,
    formInterests,
    setFormInterests,
    clearAllFields,
  } = useUsersContext();

  const { setShouldFetchUsers } = useUsersContext();

  const handleChange = (e) => {
    const attribute = e.target.name;
    const value = e.target.value;
    console.log("Field " + attribute + " was changed to " + value);
    if (attribute === "user-name") {
      setFormName(value);
    } else if (attribute === "user-age") {
      setFormAge(parseInt(value));
    } else if (attribute === "user-gender") {
      setFormGender(value);
    } else if (attribute === "user-occupation") {
      setFormOccupation(value);
    } else if (attribute === "user-interests") {
      setFormInterests(value);
    }
  };

  const formatInput = (e) => {
    const attribute = e.target.name;
    const value = e.target.value;
    if (attribute === "user-name") {
      setFormName(removeWhitespaces(value));
    } else if (attribute === "user-occupation") {
      setFormOccupation(removeWhitespaces(value));
    } else if (attribute === "user-interests") {
      setFormInterests(removeWhitespaces(value));
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      console.log(
        "A user was submitted " +
          Array([formName, formAge, formGender, formOccupation, formInterests])
      );

      const newProfile = {
        name: formName,
        age: formAge,
        gender: formGender,
        occupation: formOccupation,
        interests: formInterests,
      };

      let res = await axios.post("http://localhost:8000/create", newProfile, { timeout: 5000 });
      if (res.status === 200) {
        setShouldFetchUsers(true);
        alert("Succesfully created a user");
        clearAllFields();
      } else {
        alert("Error sending data to the server");
      }
    } catch (err) {
      console.log("Error submitting the form " + err);
    }
  };

  const handleModify = async (e) => {
    e.preventDefault();
    try {
      console.log(
        "User data are modified " +
          Array([formId, formName, formAge, formGender, formOccupation, formInterests])
      );

      const modifiedProfile = {
        id: formId,
        name: formName,
        age: formAge,
        gender: formGender,
        occupation: formOccupation,
        interests: formInterests,
      };

      let res = await axios.put("http://localhost:8000/modify", modifiedProfile, {
        timeout: 5000,
      });
      if (res.status === 200) {
        setShouldFetchUsers(true);
        alert("Succesfully modified user " + formId);
        clearAllFields();
      } else {
        alert("Error sending data to the server");
      }
    } catch (err) {
      console.log("Error submitting the form " + err);
    }
  };

  return (
    <form className="user-info-form" onSubmit={formId ? handleModify : handleCreate}>
      <div className="form-column form-labels">
        {formId && <label>ID</label>}
        <label>Name</label>
        <label>Age</label>
        <label>Gender</label>
        <label>Occupation</label>
        <label>Interests</label>
      </div>
      <div className="form-column form-values">
        {formId && <input name="user-id" value={formId} readOnly></input>}
        <input
          name="user-name"
          required
          value={formName}
          onChange={handleChange}
          onBlur={formatInput}
        />
        <input
          name="user-age"
          type="number"
          required
          value={formAge}
          onChange={handleChange}
          min={0}
        />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <label>
            <input
              name="user-gender"
              type="radio"
              value="male"
              required
              checked={formGender === "male"}
              onChange={handleChange}
            />
            Male
          </label>
          <label>
            <input
              name="user-gender"
              type="radio"
              value="female"
              checked={formGender === "female"}
              onChange={handleChange}
            />
            Female
          </label>
          <label>
            <input
              name="user-gender"
              type="radio"
              value="other"
              checked={formGender === "other"}
              onChange={handleChange}
            />
            Other
          </label>
        </div>
        <input
          name="user-occupation"
          required
          value={formOccupation}
          onChange={handleChange}
          onBlur={formatInput}
        />
        <input
          name="user-interests"
          required
          value={formInterests}
          onChange={handleChange}
          onBlur={formatInput}
        />
        <Button label={formId ? "Update" : "Create"} primary={true} type="submit" />
      </div>
    </form>
  );
};
