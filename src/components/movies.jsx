import React, { Component } from 'react'
import  { getMovies } from '../services/fakeMovieService'
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from './moviesTable';

 class Movies extends Component {
   state = {
     movies:[],
     genres:[],
     currentPage: 1,
     pageSize:4
   };

   componentDidMount(){
     const genres = [{ _id:"",name: 'All Genres'},...getGenres()]


      this.setState({ movies: getMovies(), genres});
   }
   handleDelete = (movie) => {
  const movies = this.state.movies.filter(m => m._id !== movie._id);
  this.setState({ movies });
   };

handleLike = (movie) => {
  const movies = [...this.state.movies];
  const index = movies.indexOf(movie);
  movies[index] = {...movies[index] };
  movies[index].liked = !movies[index].liked;
  this.setState({movies});    

};
handlePageChange = page  => {
  this.setState({ currentPage : page});
};
 handleGenreSelect = genre  => {
   this.setState({ selectedGenre: genre, currentPage: 1});
 };
handleSort = path => {
  console.log(path);

}
   render() {
const { length: count } = this.state.movies;
const {pageSize, currentPage,selectedGenre, movies: allMovies}= this.state;

if (count === 0 )
 return <h1 className = "body1">Tidak ada film dalam database!!!!!!!!!!</h1>;
  const filtered = 
  selectedGenre  && selectedGenre._id
  ? allMovies.filter(m => m.genre._id === selectedGenre._id ) 
  : allMovies;
 const movies = paginate(filtered,currentPage, pageSize)
     return( 
         <div className="row">
         <div className="col-3">
         <ListGroup 
         items={this.state.genres} 
         selectedItem={this.state.selectedGenre}
         onItemSelect={this.handleGenreSelect}
         />
         </div>
         <div className="col">
        <h1> semuanya ada di sini {filtered.length} film bollywood dalam database.</h1>
       
<MoviesTable 
movies={movies} 
onLike={this.handleLike} 
onDelete={this.handleDelete} 
onSort={this.handleSort}
/>
         <Pagination
         onPageChange={this.handlePageChange}
         itemsCount={filtered.length}
         pageSize={pageSize}
         currentPage={currentPage}
 
         />
         </div>
         </div>
    )    
}  
}   
export default Movies;
