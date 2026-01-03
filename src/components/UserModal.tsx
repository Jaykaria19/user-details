import { Button, Modal, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import type { User } from "../feature/users/userSlice";

interface userModalPops {
    open: boolean;
    onClose: () => void;
    user: User | null
    onSave: (user: User) => void

}
const UserModal = ({ open, onClose, user, onSave }: userModalPops) => {

    const [form, setForm] = useState<User>({
        id: Date.now(),
        firstName: '',
        lastName: '',
        email: ''
    })

    useEffect(() => {
        if (user) {
            setForm(user)
        } else {
            setForm({
                id: Date.now(),
                firstName: '',
                lastName: '',
                email: ''
            })
        }
    }, [user, open])

    const handleSave = () => {
        if (!form.firstName || !form.lastName || !form.email) return;
        onSave(form)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setForm((prev) => ({
            ...prev, [name]: value

        }));
        //setForm({ ...form, [e.target.value]: e.target.value })
    }
    return (
        <>
            <Modal open={open} onClose={onClose}>
                <div className="bg-white w-96 mx-auto mt-40 p-6 rounded shadow">
                    <TextField placeholder="firstName" name="firstName" fullWidth value={form.firstName} onChange={handleChange} />
                    <TextField placeholder="lastname" name="lastName" fullWidth value={form.lastName} onChange={handleChange} />
                    <TextField placeholder="email" name="email" fullWidth value={form.email} onChange={handleChange} />
                    <Button fullWidth variant="contained" onClick={handleSave}>
                        Save
                    </Button>
                </div>
            </Modal>
        </>
    )
}

export default UserModal