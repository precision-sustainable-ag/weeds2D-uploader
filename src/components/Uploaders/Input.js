import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";

const Input = ({ helperText, handlePickedFiles, fieldType }) => {
  return (
    <Grid item container spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography>{helperText}</Typography>
      </Grid>
      <Grid item>
        <Button variant="contained" component="label">
          Upload {fieldType === "field" ? "File" : "Folder"}
          {fieldType === "field" ? (
            <input
              type="file"
              multiple
              hidden
              accept=".arw"
              onChange={handlePickedFiles}
              //   key={inputKey}
            />
          ) : (
            <input
              multiple
              hidden
              directory=""
              webkitdirectory=""
              type="file"
              onChange={handlePickedFiles}
              //   key={inputKey}
            />
          )}
        </Button>
      </Grid>
      <Grid item>
        <Button
          component={Link}
          to={fieldType === "field" ? "semifield" : "field"}
          variant="contained"
        >
          Go to {fieldType === "field" ? "semifield" : "field"} uploader
        </Button>
      </Grid>
    </Grid>
  );
};

export default Input;
