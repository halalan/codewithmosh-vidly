import React, { Component } from 'react'
import  { getMovies } from '../services/fakeMovieService'
import Like from './common/like';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import { getGenres } from "../services/fakeGenreService";

 class Movies extends Component {
   state = {
     movies:[],
     genres:[],
     currentPage: 1,
     pageSize:4
   };

   componentDidMount(){
this.setState({movies: getMovies(), genres: getGenres()})
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
   this.setState({ selectedGenre: genre});
 };

   render() {
const { length: count } = this.state.movies;
const {pageSize, currentPage, movies: allMovies}= this.state;

if (count === 0 )
 return <h1 className = "body1">Tidak ada film dalam database!!!!!!!!!!</h1>;
 const movies = paginate(allMovies,currentPage, pageSize)
     return( 
         <div className="row">
         <div className="col-3">
         <ListGroup 
         items={this.state.genres} 
         selectedItem={this.state.selectedGenre}
         onItemSelect={this.handleGenreSelect}/>
  
         </div>
         <div className="col">
         <h3 className="body"> semuanya ada di sini {count} film bollywood dalam database.</h3>
     <table className="table">
     <thead>
       <tr>
    <th>Title</th>
     <th>Movies</th>
     <th>Stock</th>
     <th>Rate</th>
     <th/>
     <th/>
     </tr>
    </thead>
     <tbody>
       {movies.map(movie => (
      <tr  key={movie._id}>
       <td>{movie.title}</td>
       <td>{movie.genre.name}</td>
        <td>{movie.numberInStock}</td>
     <td>{movie.dailyRentalRate}</td>
     <td>
       <Like liked={movie.liked}  onClick={() =>this.handleLike(movie)}/>
       </td>
     <td>
       <button onClick={() => this.handleDelete(movie)} 
       className="btn btn-danger btn-sm"
       >
       klik Remove 
       </button>
        </td>
     </tr>
       ))}
  </tbody>
         </table>
         <Pagination
         onPageChange={this.handlePageChange}
         itemsCount={count}
         pageSize={pageSize}
         currentPage={currentPage}
         />
         
         </div>
        
         </div>
    )    
}  
}   
export default Movies;
