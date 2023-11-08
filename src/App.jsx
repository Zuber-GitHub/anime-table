import client from "./apollo-client";
import { useCallback, useEffect, useState } from "react";
import { getAnimeListQuery } from "./graphql/getAnime";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Box,
  CircularProgress,
} from "@mui/material";
import TableHeader from "./components/TableHeader";
import "../src/styles/Table.css";
import FilterDrawer from "./components/FilterDrawer";
import SummaryModal from "./components/SummaryModal";

function App() {
  const [animeList, setAnimeList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);

  const toggleDrawer = (isOpen) => {
    setOpen(isOpen);
  };

  const toggleModal = (isOpen) => {
    setModalOpen(isOpen);
  };

  const getAnimeList = useCallback(async () => {
    try {
      setLoading(true);
      const { data, errors } = await client.query({
        query: getAnimeListQuery,
        variables: {
          page: 1,
          perPage: 100,
        },
      });

      if (errors) {
        console.log(errors);
        return;
      }
      setAnimeList([...data.Page.media]);
      setFilteredList([...data.Page.media]);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAnimeList();
  }, [getAnimeList]);

  const handleSummary = (anime) => {
    setSelectedRow({ ...anime });
    toggleModal(true);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "45vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="wrapper">
      <TableHeader toggleDrawer={toggleDrawer} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Episodes</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Score</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Start Year</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredList.map((anime) => (
              <TableRow key={anime.id}>
                <TableCell>
                  <div
                    className="anime-title"
                    onClick={() => handleSummary(anime)}
                  >
                    {anime.title.english ?? "NA"}
                  </div>
                </TableCell>
                <TableCell>{anime.episodes}</TableCell>
                <TableCell>{anime.status}</TableCell>
                <TableCell>{anime.averageScore}</TableCell>
                <TableCell>{anime.startDate.year}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <FilterDrawer
        open={open}
        toggleDrawer={toggleDrawer}
        animeList={animeList}
        setFilteredList={setFilteredList}
      />
      <SummaryModal
        content={selectedRow}
        modalOpen={modalOpen}
        toggleModal={toggleModal}
      />
    </div>
  );
}

export default App;
