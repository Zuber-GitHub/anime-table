import { useState } from "react";
import { Drawer, Button, TextField, Autocomplete } from "@mui/material";
import "../styles/FilterDrawer.css";

const statusOptions = [
  {
    label: "FINISHED",
    value: "FINISHED",
  },
  {
    label: "RELEASING",
    value: "RELEASING",
  },
  {
    label: "NOT YET RELEASED",
    value: "NOT_YET_RELEASED",
  },
  {
    label: "HIATUS",
    value: "HIATUS",
  },
];

const episodeOptions = [
  {
    label: "Less than 10",
    value: [0, 10],
  },
  {
    label: "10 to 50",
    value: [10, 50],
  },
  {
    label: "50 to 100",
    value: [50, 100],
  },
  {
    label: "More than 100",
    value: [100, 200],
  },
];

const startYearOptions = [
  {
    label: "Less than 2000",
    value: [0, 2000],
  },
  {
    label: "2000 to 2010",
    value: [2000, 2010],
  },
  {
    label: "2010 to 2020",
    value: [2010, 2020],
  },
  {
    label: "More than 2020",
    value: [2020, 2023],
  },
];

function FilterDrawer({ open, toggleDrawer, animeList, setFilteredList }) {
  const [filters, setFilters] = useState({
    episodes: "",
    status: "",
    startYear: "",
  });

  const handleFilterChange = (e, newValue, name) => {
    setFilters({
      ...filters,
      [name]: newValue,
    });
  };

  const applyFilters = () => {
    const {
      episodes: { value: episodesValue },
      startYear: { value: startYearValue },
      status: { value: statusValue },
    } = filters;
    console.log(startYearValue);
    const newData = animeList.filter((item) => {
      if (statusValue && statusValue !== item.status) {
        return false;
      }

      if (episodesValue) {
        const [min, max] = episodesValue;
        if (item.episodes < min || item.episodes > max) {
          return false;
        }
      }

      if (startYearValue) {
        const [minYear, maxYear] = startYearValue;
        if (item.startDate.year < minYear || item.startDate.year > maxYear) {
          return false;
        }
      }
      return true;
    });

    setFilteredList([...newData]);
    toggleDrawer(false);
  };

  const clearFilters = () => {
    setFilters({
      episodes: "",
      status: "",
      startYear: "",
    });
    setFilteredList([...animeList]);
    toggleDrawer(false);
  };

  return (
    <div>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => toggleDrawer(false)}
        PaperProps={{ style: { width: 300 } }}
      >
        <div className="select-container">
          <div>
            <Autocomplete
              disablePortal
              options={startYearOptions}
              sx={{ width: 200 }}
              value={filters.startYear}
              onChange={(e, newValue) => {
                handleFilterChange(e, newValue, "startYear");
              }}
              renderInput={(params) => (
                <TextField {...params} label="Start Year" />
              )}
            />
          </div>
          <div>
            <Autocomplete
              disablePortal
              options={episodeOptions}
              value={filters.episodes}
              sx={{ width: 200 }}
              onChange={(e, newValue) => {
                handleFilterChange(e, newValue, "episodes");
              }}
              renderInput={(params) => (
                <TextField {...params} label="Episodes" />
              )}
            />
          </div>
          <div>
            <Autocomplete
              disablePortal
              options={statusOptions}
              value={filters.status}
              sx={{ width: 200 }}
              onChange={(e, newValue) => {
                handleFilterChange(e, newValue, "status");
              }}
              renderInput={(params) => <TextField {...params} label="Status" />}
            />
          </div>
          <Button variant="contained" onClick={applyFilters}>
            Filter
          </Button>
          <Button onClick={clearFilters}>Clear Filters</Button>
        </div>
      </Drawer>
    </div>
  );
}

export default FilterDrawer;
