import {
    Avatar,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import type { User } from "../feature/users/userSlice";

interface UserTableProps {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (id: number) => void;
    onFavorite?: (user: User) => void;
}

const UserTable = ({
    users,
    onDelete,
    onEdit,
    onFavorite,
}: UserTableProps) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {users.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={3} align="center">
                            No users found
                        </TableCell>
                    </TableRow>
                ) : (
                    users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar
                                        src={user.image}
                                        alt={user.firstName}
                                        sx={{ width: 40, height: 40 }}
                                    />
                                    <span>
                                        {user.firstName} {user.lastName}
                                    </span>
                                </div>
                            </TableCell>

                            <TableCell>{user.email}</TableCell>

                            <TableCell>
                                <Button onClick={() => onEdit(user)}>Edit</Button>
                                <Button color="error" onClick={() => onDelete(user.id)}>
                                    Delete
                                </Button>

                                {onFavorite && (
                                    <Button color="success" onClick={() => onFavorite(user)}>
                                        Favorite
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
};

export default UserTable;
