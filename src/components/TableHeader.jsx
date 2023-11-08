import FilterListIcon from "@mui/icons-material/FilterList";
import "../styles/TableHeader.css";

const TableHeader = ({ toggleDrawer }) => {
  return (
    <div className="container">
      <div className="heading">Get Info about your favorite Anime</div>
      <FilterListIcon
        className="filter-icon"
        fontSize="large"
        onClick={() => {
          toggleDrawer(true);
        }}
        color="primary"
      />
    </div>
  );
};

export default TableHeader;
