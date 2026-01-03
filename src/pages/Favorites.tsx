import { useEffect, useState } from "react";
import UserTable from "../components/UserTable";
import UserModal from "../components/UserModal";
import type { User } from "../feature/users/userSlice";
import {
    getFavorites,
    removeFromFavorites,
    updateFavorite
} from "../utils/favoriteStorage";

const Favorites = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    useEffect(() => {
        setUsers(getFavorites());
    }, []);

    const handleRemove = (id: number) => {
        const updated = removeFromFavorites(id);
        setUsers(updated);
    };

    const handleSave = (user: User) => {
        const updated = updateFavorite(user);
        setUsers(updated);
        setOpen(false);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Favorite Users</h2>

            <div className="bg-white rounded shadow">
                <UserTable
                    users={users}
                    onDelete={handleRemove}
                    onEdit={(user) => {
                        setSelectedUser(user);
                        setOpen(true);
                    }}
                />
            </div>

            <UserModal
                open={open}
                user={selectedUser}
                onSave={handleSave}
                onClose={() => setOpen(false)}
            />
        </div>
    );
};

export default Favorites;
