import { useDispatch, useSelector, useStore } from "react-redux"
import FilterBar from "../components/FilterBar"
import UserTable from "../components/UserTable"
import { type AppDispatch, type RootState } from "../app/store"
import { useEffect, useMemo, useState } from "react"
import { addUser, deleteUser, fetchUsers, updateUser, type User } from "../feature/users/userSlice"
import { addToFavorites } from "../utils/favoriteStorage"
import UserModal from "../components/UserModal"

const Home = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { list } = useSelector((state: RootState) => state.users)

    const [open, setOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)

    const [search, setSearch] = useState("")
    const [sortBy, setSortBy] = useState<'name' | 'email'>('name')

    useEffect(() => { dispatch(fetchUsers()) }, [dispatch])

    const filteredUsers = useMemo(() => {
        let users = [...list];
        const value = search.toLowerCase().trim();

        if (value) {
            users = users.filter((u) => {
                const fullName = `${u.firstName} ${u.lastName}`.toLowerCase();
                const email = u.email.toLowerCase();

                if (sortBy === "name") {
                    return fullName.includes(value);
                }

                if (sortBy === "email") {
                    return email.includes(value);
                }

                return fullName.includes(value) || email.includes(value);
            });
        }

        return users;
    }, [list, search, sortBy]);



    const handleAddUser = () => {
        setSelectedUser(null);
        setOpen(true)
    }

    const handleEditUser = (user: User) => {

        setSelectedUser(user)
        setOpen(true)
    }

    const handleSaveUser = (user: User) => {
        if (selectedUser) {
            dispatch(updateUser(user))
        } else { dispatch(addUser({ ...user, id: Date.now() })) }
        setOpen(false)
    }

    const handleDeleteUser = (id: number) => {
        dispatch(deleteUser(id))
    }

    return (<>
        <div className="space-y-4">
            <FilterBar
                search={search}
                sortBy={sortBy}
                onSearchChange={setSearch}
                onSortChange={setSortBy} />

            <button className="bg-blue-600 text-white px-4 py-2" onClick={handleAddUser}>
                Add user
            </button>

            <div className="bg-white rounded shadow">
                <UserTable users={filteredUsers} onEdit={handleEditUser} onDelete={handleDeleteUser}
                    onFavorite={addToFavorites} />
            </div>

            <UserModal
                open={open}
                user={selectedUser}
                onSave={handleSaveUser}
                onClose={() => setOpen(false)}
            />
        </div>
    </>
    )
}

export default Home