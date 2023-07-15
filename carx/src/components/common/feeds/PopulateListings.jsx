import React, { useEffect, useState } from "react";
import { Box, Typography, Drawer, IconButton, Divider } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DisplayCard from "../card/DisplayCard";
import Sort from "../sort/Sort";
import { SideDrawer } from "../sidedrawer/SideDrawer";
import { DrawerHeader, Main } from "./styled_components";
import { sortFormat } from "../../../temp/templates";
import { sortList } from "../sort/sort_util";
import { useSelector } from "react-redux";
import "./populate.css";
const drawerwidth = 500;

const PopulateListings = ({ keywords }) => {
  const { publicListings } = useSelector((state) => state.publicListings);
  const [publicPosts, setPublicPosts] = useState(publicListings);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [inDrawer, setInDrawer] = useState(null);
  const [sort, setSort] = useState(sortFormat);

  const handleDrawerOpen = (obj) => {
    setInDrawer(obj);
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const setPostsByKeywords = () => {
    const newList = publicListings.filter(
      (post) =>
        post &&
        (post.make.toLowerCase().includes(keywords) ||
          post.model.toLowerCase().includes(keywords) ||
          post.model.toLowerCase().includes(keywords))
    );
    setPublicPosts(newList);
  };

  useEffect(() => {
    Object.keys(sort).map(
      (item) =>
        sort[item].active &&
        sortList(item, sort[item].dir, publicPosts, setPublicPosts)
    );
  }, [sort]);

  useEffect(() => {
    setPublicPosts(publicListings);
  }, [publicListings]);

  useEffect(() => {
    setPostsByKeywords();
  }, [keywords]);
  return (
    <>
      <Box className="header">
        <h2>Recent Car Listings</h2>
        <Typography sx={{ marginLeft: "auto", marginRight: 2 }}>
          Sort By
        </Typography>
        <Sort sort={sort} setSort={setSort} />
      </Box>

      <Main open={drawerOpen} drawerwidth={drawerwidth}>
        {publicPosts.map((item) => (
          <DisplayCard
            key={item._id}
            vehicleData={item}
            onClick={() => handleDrawerOpen(item)}
          />
        ))}
      </Main>
      <Drawer
        sx={{
          width: { xs: "320px", sm: "320px", md: drawerwidth, lg: drawerwidth },
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: {
              xs: "320px",
              sm: "320px",
              md: drawerwidth,
              lg: drawerwidth,
            },
          },
        }}
        variant="persistent"
        anchor="right"
        open={drawerOpen}
      >
        <DrawerHeader>
          <Box
            sx={{
              display: { xs: "none", sm: "none", md: "flex", lg: "flex" },
            }}
          >
            <IconButton onClick={handleDrawerClose} id="chevron">
              <ChevronRightIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              marginLeft: "auto",
              display: { xm: "flex", sm: "flex", md: "none", lg: "none" },
            }}
          >
            <IconButton onClick={handleDrawerClose} id="chevron">
              <ChevronRightIcon />
            </IconButton>
          </Box>
        </DrawerHeader>
        <Divider />
        {inDrawer && <SideDrawer inDrawer={inDrawer} />}
      </Drawer>
    </>
  );
};

export default PopulateListings;
