import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { makes } from "../../../temp/makes";
import { fetchOemData } from "../../screens/user/controllers/fetchCarsOem";
import { inventoryFormat } from "../../../temp/templates";
import { setCredentials } from "../../../redux/slices/authSlice";
import { setPublicListings } from "../../../redux/slices/publicListingsSlice";
import CloseIcon from "@mui/icons-material/Close";
import "./modal.css";

const ModalForm = ({ open, setOpen, postListing }) => {
  const [cookie, setCookie] = useCookies(["jwt"]);
  const [availableModels, setAvailableModels] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);
  const [form, setForm] = useState(inventoryFormat);
  const [images, setImages] = useState([]);
  const { model, make } = form;
  const dispatch = useDispatch();

  const allYears = useCallback(async () => {
    const res = await fetchOemData({
      make: make,
      model: model,
    });
    setAvailableYears(await res);
  }, [make, model]);

  const allModels = useCallback(async () => {
    const res = await fetchOemData({ make: make });
    setAvailableModels(await res);
    if (make && model) {
      allYears();
    }
  }, [allYears, make, model]);

  useEffect(() => {
    setAvailableModels([]);
    setAvailableYears([]);
    if (make) {
      allModels();
    }
  }, [allModels, make]);

  const handleInput = (e) => {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleFiles = (e) => {
    const photos = Array.from(e.target.files);
    const photosArr = [];
    photos.forEach((photo) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        photosArr.push(base64String);
        setImages((prev) => [...prev, ...photosArr]);
      };
      reader.readAsDataURL(photo);
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in form) {
        if (key !== "images") {
          formData.append(key, form[key]);
        }
      }
      for (const image of images) {
        formData.append("images", image);
      }
      const res = await postListing({ formData, cookie }).unwrap();
      const user = res.user;
      setCookie("jwt", user.token);
      dispatch(setCredentials(user));
      dispatch(setPublicListings(res.publicListings));
      setForm(inventoryFormat);
      setOpen((prev) => !prev);
      toast.success("Post added successfully!");
    } catch (e) {
      toast.error(e?.data?.message || e.message);
    }
  };

  return (
    <>
      <Modal open={open} className="modal-container">
        <Box
          className="modal"
          sx={{
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            m: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add a listing
          </Typography>
          <IconButton
            className="modal-close-btn"
            onClick={() => setOpen(false)}
          >
            <CloseIcon />
          </IconButton>

          <Container className="form-container">
            <form onSubmit={handleFormSubmit} encType="multipart/form-data">
              <Box className="box-style">
                <FormControl sx={{ width: "223px" }} required>
                  <InputLabel id="input-make-label">Make</InputLabel>
                  <Select
                    labelId="input-make-label"
                    id="input-make"
                    name="make"
                    value={form.make}
                    onChange={handleInput}
                    autoWidth
                    required
                    label="make"
                  >
                    <MenuItem value="">
                      <em>Select a car maker</em>
                    </MenuItem>
                    {makes.map((maker) => (
                      <MenuItem key={Math.random() * 50} value={maker.name}>
                        {maker.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ width: "223px" }}>
                  <InputLabel id="input-model-label">Model</InputLabel>
                  <Select
                    labelId="input-model-label"
                    id="input-model"
                    value={form.model}
                    onChange={handleInput}
                    autoWidth
                    label="model"
                    name="model"
                  >
                    <MenuItem value="">
                      <em>Select a model</em>
                    </MenuItem>
                    {availableModels.length > 0 ? (
                      availableModels.map((make) => (
                        <MenuItem key={Math.random() * 55} value={make.model}>
                          {make.model}
                        </MenuItem>
                      ))
                    ) : (
                      <span>Select a maker to show models</span>
                    )}
                  </Select>
                </FormControl>
                <FormControl sx={{ width: "223px" }}>
                  <InputLabel id="input-year-label">Year</InputLabel>
                  <Select
                    labelId="input-year-label"
                    id="input-year"
                    value={form.year}
                    onChange={handleInput}
                    autoWidth
                    label="year"
                    name="year"
                  >
                    <MenuItem value="">
                      <em>Select model year</em>
                    </MenuItem>
                    {availableYears.length > 0 ? (
                      availableYears.map((make) => (
                        <MenuItem key={Math.random() * 60} value={make.year}>
                          {make.year}
                        </MenuItem>
                      ))
                    ) : (
                      <span>Select a model to show years</span>
                    )}
                  </Select>
                </FormControl>
              </Box>
              <Box className="box-style">
                <TextField
                  label="Contact"
                  type="number"
                  placeholder="Contact number"
                  value={form.contact}
                  onChange={handleInput}
                  name="contact"
                  id="numInput"
                  required
                />
                <TextField
                  id="numInput"
                  label="Price"
                  type="number"
                  placeholder="Original price"
                  value={form.price}
                  onChange={handleInput}
                  name="price"
                />
                <TextField
                  id="numInput"
                  label="Mileage"
                  type="number"
                  placeholder="Average mileage"
                  value={form.mileage}
                  onChange={handleInput}
                  name="mileage"
                />
              </Box>
              <Box className="box-style">
                <TextField
                  id="numInput"
                  label="Power"
                  type="number"
                  placeholder="Average bhp"
                  value={form.power}
                  onChange={handleInput}
                  name="power"
                />
                <TextField
                  id="numInput"
                  label="Speed"
                  type="number"
                  placeholder="Max speed"
                  value={form.speed}
                  onChange={handleInput}
                  name="speed"
                />
                <TextField
                  label="Driven"
                  type="number"
                  value={form.driven}
                  onChange={handleInput}
                  name="driven"
                  id="numInput"
                />
              </Box>
              <Box className="box-style">
                <TextField
                  label="Title"
                  type="text"
                  value={form.title}
                  onChange={handleInput}
                  name="title"
                  required
                />
                <TextField
                  label="Description"
                  type="text"
                  value={form.description}
                  onChange={handleInput}
                  name="description"
                />
                <TextField
                  label="Damages"
                  type="text"
                  value={form.damages}
                  onChange={handleInput}
                  name="damages"
                />
              </Box>
              <Box className="box-style">
                <TextField
                  label="Number of accidents"
                  type="number"
                  value={form.accidents}
                  onChange={handleInput}
                  name="accidents"
                  id="numInput"
                />
                <TextField
                  label="Number of previous owners"
                  type="number"
                  value={form.owners}
                  onChange={handleInput}
                  name="owners"
                  id="numInput"
                />
                <TextField
                  label="Registration place"
                  type="text"
                  value={form.registration}
                  onChange={handleInput}
                  name="registration"
                />
              </Box>
              <Box
                className="box-style"
                sx={{ justifyContent: "space-between" }}
              >
                <TextField
                  label="tags"
                  type="text"
                  value={form.tags}
                  onChange={handleInput}
                  name="tags"
                />
                <TextField
                  label="Original color"
                  type="color"
                  value={form.originalColor}
                  onChange={handleInput}
                  name="originalColor"
                  style={{ width: "100px", height: "auto" }}
                />
                <TextField
                  type="file"
                  accept="image/jpeg, image/png, image/jpg"
                  multiple
                  name="images"
                  onChange={handleFiles}
                />
              </Box>
              <Box
                className="box-style"
                sx={{ height: "50px", alignItems: "center" }}
              >
                {images.length > 0 && (
                  <>
                    <h4>Selected Car Images</h4>
                    <Button
                      className="clearBtn"
                      variant="outlined"
                      type="button"
                      onClick={() => setImages([])}
                    >
                      Clear images
                    </Button>
                  </>
                )}
                <Button className="addBtn" variant="contained" type="submit">
                  Add to inventory
                </Button>
              </Box>
            </form>
            {images &&
              images.map((imgSrc, idx) => (
                <img src={imgSrc} alt="" key={idx} />
              ))}
          </Container>
        </Box>
      </Modal>
    </>
  );
};

export default ModalForm;
