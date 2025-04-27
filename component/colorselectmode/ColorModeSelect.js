import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function ColorModeSelect(props) {
  const { value, onChange } = props;

  return (
    <Select
      value={value}
      onChange={onChange}
      MenuProps={{
        disableScrollLock: true,
      }}
      {...props}
    >
      <MenuItem value="light">Light</MenuItem>
      <MenuItem value="dark">Dark</MenuItem>
    </Select>
  );
}
