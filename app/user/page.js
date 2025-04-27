import { Avatar, Container, Divider, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import Link from "next/link";
import { Fragment } from "react";

export default async function Users() {
  let users = [];  // Initialize as an array

  try {
    const response = await fetch(`http://localhost:3000/api/user/allusers`, {
      method: "GET",
      next: { revalidate: 20 },
      headers: {
        "Accept": "application/json",
      },
    });

    if (response.ok) {
      const res = await response.json();  // Properly extract JSON response
      users=res.data
    } else {
      console.error("Failed to fetch users.");
    }
  } catch (err) {
    console.error("getalluserserror", err);
  }

  const lists = users?.map((user) => (
    <Fragment key={user._id}>
      <ListItem sx={{padding:'20px'}} component={Link} href={`/user/${user._id}`}>
        <ListItemAvatar>
          <Avatar src={user.image} alt={user.name} sx={{width:'15vh',height:'15vh',maxWidth:'27vh',maxHeight:'27vh',marginRight:'2rem'}} />
        </ListItemAvatar>
        <ListItemText primary={user.name} secondary="secondary" />
      </ListItem>
      <Divider />
    </Fragment>
  ));

  return (
    <Container maxWidth="md">
      <List>
        {lists}
      </List>
    </Container>
  );
}