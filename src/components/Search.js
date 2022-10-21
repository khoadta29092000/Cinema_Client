import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
Search.propTypes = {
    onSubmit: PropTypes.func,
};

Search.defaultProps = {
    onSubmit: null,
}

function Search(props) {

   
    const { onSubmit } = props;
    const [searchTerm, setSearchTerm] = useState('');
    props.parentCallback(searchTerm)
    const typingTimeoutRef = useRef(null);

    function handleSearchTermChange(e) {
        const value = e.target.value;
        setSearchTerm(value);

        if (!onSubmit) return;
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        };

        typingTimeoutRef.current = setTimeout(() => {
            const formValues = {
                searchTerm: value,
            };
            onSubmit(formValues);
        }, 2000);

    }

    return (
        <div>
            <form >
                {/* <input type="text"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                    placeholder="Search..."
                    className="border-2 rounded-lg float-right mr-16 mb-10 border-xanhla w-64  my-auto outline-none p-5 h-10   mt-5"
                /> */}
 <Paper
                        component="form"

                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search"
                            alue={searchTerm}
                            onChange={handleSearchTermChange}
                        />
                        <IconButton className='' sx={{ p: '10px', outline: "none" }} >
                            <SearchIcon />
                        </IconButton>

                    </Paper>


            </form>
        </div>
    )
}
export default Search;