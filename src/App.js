import React, { useEffect, useState } from "react";
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
  const [_checked, _setChecked] = useState(!!checked);

  useEffect(() => {
    if (!setChecked) {
      console.warn(
        "CheckboxInput should be called inside Checkbox for maximum benefit"
      );
    }
  }, []);

  return (
    <input
      type="checkbox"
      checked={_checked}
      onChange={(e) => {
        _setChecked(e.target.checked);
        if (setChecked) {
          setChecked(e.target.checked);
        }
      }}
    />
  );
};

const Label = ({ setChecked, children }) => {
  if (!setChecked) {
    throw new Error("Label should be called from Checkbox component");
  }

  return (
    <label onClick={() => setChecked((state) => !state)}>{children}</label>
  );
};

function App() {
  return <CheckboxInput />;
}

export default App;
