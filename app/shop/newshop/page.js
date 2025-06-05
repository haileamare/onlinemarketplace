'use client';
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FileUpload } from "@mui/icons-material";
import { Box, Button, Card, Container, FormControl, FormLabel, TextField, useTheme } from "@mui/material";

export default function NewShop() {
    const [values, setValues] = useState({
        name: '',
        description: '',
        photo: null
    });

    // Initialize authentication session
    const { data: session, status } = useSession();
    const router = useRouter();
    const theme = useTheme();

    // Redirect unauthenticated users properly
    
    useEffect(() => {
        if (status === "unauthenticated") {
           router.push("/signin");
        }
    }, [status]);


    // Handle form input updates
    const getInput = (name) => (event) => {
        let value = event.target.value;
        if (name === "photo") {
            value = event.target.files[0];
        }
        setValues({ ...values, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("photo", values.photo);

        try {
            // Example API call (Replace with actual API endpoint)
            const result = await fetch("http://localhost:3000/api/shop/"+session.user.id, {
                method: "POST",
                credentials:'include',
                body: formData
            });

            if (result.ok) {
                console.log("Shop created successfully!");
                router.push("/dashboard"); // Redirect after success
            } else {
                console.error("Error creating shop:", await result.json());
                throw new Error(await result.json())
            }
        } catch (err) {
            console.log("Error in signup:", err);
        }
    };

    return (
        <Card style={{gridArea:"main"}}>
            <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column", gap: theme.spacing(2), padding: theme.spacing(1), marginTop: theme.spacing(1) }}>
                <FormControl style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Button variant="contained" component="label" color="primary" style={{ width: "30%" }}>
                        Upload File
                        <FileUpload />
                        <input type="file" style={{ display: "none" }} onChange={getInput("photo")} />
                    </Button>
                    {values?.photo?.name}
                </FormControl>

                <FormControl>
                    <FormLabel>Name</FormLabel>
                    <TextField value={values.name} onChange={getInput("name")} placeholder="Name..." />
                </FormControl>

                <FormControl>
                    <FormLabel>Description</FormLabel>
                    <TextField value={values.description} onChange={getInput("description")} placeholder="Description..." />
                </FormControl>

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
                    <Button variant="contained" color="secondary">Cancel</Button>
                </Box>
            </Container>
        </Card>
    );
}