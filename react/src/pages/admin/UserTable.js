import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Stack, Box, Typography, Avatar } from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import LoadingButton from '@mui/lab/LoadingButton';
function IconDatabasePlus(props) {
    return (
        <Stack justifyContent="center" alignItems="center" height="100%">
            <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="10em"
                width="10em"
                {...props}
            >
                <path d="M18 14h2v3h3v2h-3v3h-2v-3h-3v-2h3v-3M12 3c4.42 0 8 1.79 8 4s-3.58 4-8 4-8-1.79-8-4 3.58-4 8-4M4 9c0 2.21 3.58 4 8 4s8-1.79 8-4v3.08L19 12c-2.59 0-4.8 1.64-5.64 3.94L12 16c-4.42 0-8-1.79-8-4V9m0 5c0 2.21 3.58 4 8 4h1c0 1.05.27 2.04.75 2.9L12 21c-4.42 0-8-1.79-8-4v-3z" />
            </svg>
            <Typography variant="h5">No Data Found</Typography>
        </Stack>

    );
}
export const UserTable = ({ data = [], isLoading }) => {


    const columns = [
        // { field: "id", headerName: "ID", width: 90 },
        {
            field: "profile",
            headerName: "Profile",
            sortable: false,
            width: 200,
            renderCell: (params) => (
                <Stack direction="row" spacing={4} alignItems="center" height="100%">
                    <Avatar
                        src={`data:image/png;base64,${btoa(String.fromCharCode(...new Uint8Array(params.row.profileImage.data.data)))}`}
                        alt=""
                    ></Avatar>
                </Stack>
            ),
        },
        { field: "name", headerName: "Name", width: 150, },
        { field: "email", headerName: "Email", width: 150, },
        { field: "mobileNumber", headerName: "mobileNumber", width: 150, },
        {
            field: "verifyed", headerName: "Verifyed",
            width: 150,
        },


    ];

    return (
        <Box sx={{ height: 300, width: '100%', boxShadow: 24 }}>
            <DataGrid
                rows={data}
                getRowId={(data) => data._id}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                slots={{
                    loadingOverlay: LinearProgress,
                    noRowsOverlay: IconDatabasePlus,
                }}
                loading={isLoading}
            />
        </Box>
    );
}
