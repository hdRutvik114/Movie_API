import React from 'react';

const Moviecard = ({ movie: { title, vote_average, poster_path, release_date, original_langauge } }) => {
    return (
        <div className='movie-card'>
            <img src={poster_path?`https://image.tmdb.org/t/p/w500/${poster_path}` : '/no .png'} />
            <div className='mt-4'>
                <h3>{title}</h3>

                <div className='content'>
                    <div className='rating'>
                        <img src="../public/vuesax/bold/star.png" alt="" />
                        <p>{vote_average?vote_average.toFixed(1):'N/a'}</p>
                    </div>

                    <span>.</span>
                    <p className='lang'>{original_langauge}</p>
                    <span>.</span>
                    <p className='year'>{release_date?release_date.split('-')[0]:'/NA'}</p>
                    
                </div>
            </div>
        </div>
    )
};

export default Moviecard;