import React from "react";
import "./user-info-form.css";
import { Button } from "./Button";
import axios from "axios";
import { useUsersContext } from "../contexts/UsersContext";

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
  } = useUsersContext();

  const { setShouldFetchUsers } = useUsersContext();

  const handleChange = (e) => {
    console.log("Field " + e.target.name + " was changed to " + e.target.value);
    if (e.target.name === "user-name") {
      setFormName(e.target.value);
    } else if (e.target.name === "user-age") {
      setFormAge(parseInt(e.target.value));
    } else if (e.target.name === "user-gender") {
      setFormGender(e.target.value);
    } else if (e.target.name === "user-occupation") {
      setFormOccupation(e.target.value);
    } else if (e.target.name === "user-interests") {
      setFormInterests(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
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

  const clearAllFields = () => {
    setFormName("");
    setFormAge("");
    setFormGender("");
    setFormOccupation("");
    setFormInterests("");
  };

  return (
    <form className="user-info-form" onSubmit={handleSubmit}>
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
        <input name="user-name" required value={formName} onChange={handleChange} />
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
        <input name="user-occupation" required value={formOccupation} onChange={handleChange} />
        <input name="user-interests" required value={formInterests} onChange={handleChange} />
        <Button label={formId? "Update" : "Create"} primary={true} type="submit" />
      </div>
    </form>
  );
};
