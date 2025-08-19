import React from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
const Search = ({searchTerm,setsearchTerm}) => {

  return (



    <div className='search'>

        <div>
           <SearchOutlinedIcon className='img'/>
            <input type="text"
            className='search'
            placeholder='Search through thousands of movies'
            value={searchTerm}
            onChange={(e)=>{
                setsearchTerm(e.target.value); console.log(e.target.value)}}
            />
        </div>
    </div>



  )
};

export default Search;