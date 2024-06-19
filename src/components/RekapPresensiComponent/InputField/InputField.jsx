import React from "react";
import "./InputField.css";

export function InputField({label, placeholder}) {
  return (
    <div className="input-field">
      <p>{label}</p>
      <input type="text" placeholder={placeholder}/>
    </div>
  )
}