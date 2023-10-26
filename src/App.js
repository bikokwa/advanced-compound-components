import React, { useState } from "react";
import "./App.css";

const Checkbox = ({ children }) => {
  const [checked, setChecked] = useState(true);

  return React.Children.map(children, (child) => {
    console.log(child);

    if (child.type !== Label && child.type !== CheckboxInput) {
      throw new Error("No custom element supported");
    }
    const clone = React.cloneElement(child, {
      checked,
      setChecked,
    });
    return clone;
  });
};

const CheckboxInput = ({ checked, setChecked }) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};

const Label = ({ setChecked, children }) => {
  return (
    <label onClick={() => setChecked((state) => !state)}>{children}</label>
  );
};

function App() {
  return (
    <div className="App">
      <Checkbox>
        <CheckboxInput />
        <Label>Check box label</Label>
      </Checkbox>
    </div>
  );
}

export default App;
