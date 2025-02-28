import { Menu, MenuItem } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function CustomerHeaderMenu({
  handleMenuClick,
  handleMenuClose,
  anchorEl,
}) {
  const filterCategory = useSelector((state) => state.users.filterCategory);

  const [category, setCategory] = useState([]);

  useLayoutEffect(() => {
    setCategory(filterCategory);
  }, [filterCategory]);

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
    >
      {category.map((c) => (
        <MenuItem onClick={handleMenuClose}>{c.category.category}</MenuItem>
      ))}
    </Menu>
  );
}
