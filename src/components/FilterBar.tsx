import { MenuItem, Select, TextField } from "@mui/material"

interface FilterBarProps {
    search: string;
    sortBy: "name" | "email";
    onSearchChange: (value: string) => void;
    onSortChange: (value: "name" | "email") => void;
}

const FilterBar = ({ search, sortBy, onSearchChange, onSortChange }: FilterBarProps) => {
    return (
        <>

            <div className="bg-white p-4 rounded shadow">
                <TextField size="small" fullWidth placeholder="search users"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)} />
            </div>

            <Select size="small" value={sortBy}
                onChange={(e) => onSortChange(e.target.value as "name" | "email")}>
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="email">Email</MenuItem>
            </Select>

        </>
    )
}

export default FilterBar