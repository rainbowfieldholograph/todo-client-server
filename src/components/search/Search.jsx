import { memo } from 'react';
import { FormControl, Input, InputAdornment, InputLabel } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Search = memo(function Search({ setSearch, search }) {
  return (
    <FormControl variant="standard" sx={{ maxWidth: 300, width: '100%' }}>
      <InputLabel htmlFor="input-with-icon-adornment">Search for todos</InputLabel>
      <Input
        id="input-with-icon-adornment"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon color="primary" fontSize="large" />
          </InputAdornment>
        }
      />
    </FormControl>
  );
});

export default Search;
