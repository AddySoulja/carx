import React, { useCallback } from "react";
import { Fab } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { sortFormat } from "../../../temp/templates";

const Sort = ({ sort, setSort }) => {
  const handleSort = useCallback(
    (e) => {
      let sortType = e.target.name;
      if (sortType !== undefined) {
        setSort((prev) => {
          return {
            ...sortFormat,
            [sortType]: {
              active: true,
              dir: prev[sortType].dir === "asc" ? "desc" : "asc",
            },
          };
        });
      }
    },
    [setSort]
  );

  return (
    <>
      <Fab
        variant="extended"
        sx={{ mr: 2, boxShadow: "none" }}
        size="small"
        onClick={handleSort}
        name="make"
        color={sort.make.active ? "success" : "default"}
      >
        Name
        {sort.make.active &&
          (sort.make.dir === "desc" ? (
            <ArrowUpwardIcon />
          ) : (
            <ArrowDownwardIcon />
          ))}
      </Fab>
      <Fab
        variant="extended"
        sx={{ mr: 2, boxShadow: "none" }}
        size="small"
        onClick={handleSort}
        name="price"
        color={sort.price.active ? "success" : "default"}
      >
        Price
        {sort.price.active &&
          (sort.price.dir === "desc" ? (
            <ArrowUpwardIcon />
          ) : (
            <ArrowDownwardIcon />
          ))}
      </Fab>
      <Fab
        variant="extended"
        sx={{ mr: 2, boxShadow: "none" }}
        size="small"
        onClick={handleSort}
        name="mileage"
        color={sort.mileage.active ? "success" : "default"}
      >
        Mileage
        {sort.mileage.active &&
          (sort.mileage.dir === "desc" ? (
            <ArrowUpwardIcon />
          ) : (
            <ArrowDownwardIcon />
          ))}
      </Fab>
    </>
  );
};

export default Sort;
