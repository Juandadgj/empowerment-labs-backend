import { Injectable } from '@nestjs/common';
import { Model, InjectModel } from 'nestjs-dynamoose';
import { plainToClass } from 'class-transformer';
import { FilteredDataMovie } from '../../utils/data-mappers.util';
import { AxiosService } from '../../services/axios.service';
import { Movie, MovieKey } from '../../shared/interfaces/movie.interface';
import { FavoriteMovie, FavoriteMovieKey } from '../../shared/interfaces/favorite-movie.interface';
import { MovieNote, MovieNoteKey } from '../../shared/interfaces/movie-note.interface';
import { User, UserKey } from '../../shared/interfaces/user.interface';
import { AddFavoriteDto } from './dto/add-favorite.dto';
import { AddNoteDto } from './dto/add-note.dto';
import { MoviesQueryApiDto } from './dto/popular-movies.dto';

@Injectable()
export class MovieService {
  constructor(
    private readonly axiosService: AxiosService,
    @InjectModel('Movie')
    private readonly movieModel: Model<Movie, MovieKey>,
    @InjectModel('FavoriteMovie')
    private readonly favoriteMovieModel: Model<FavoriteMovie, FavoriteMovieKey>,
    @InjectModel('MovieNote')
    private readonly movieNoteModel: Model<MovieNote, MovieNoteKey>,
    @InjectModel('User')
    private readonly userModel: Model<User, UserKey>,
  ) {}

  async findPopulars() {
    try {
      const popularMovies: MoviesQueryApiDto = await this.axiosService.get('/movie/popular')
      return {
        status: true,
        msg: 'Most popular movies consulted successfully',
        meta: {
          page: popularMovies.page,
          total_pages: popularMovies.total_pages,
          total_results: popularMovies.total_results,
        },
        data: popularMovies.results,
      }
    } catch (error) {
      return {
        status: false,
        msg: error.message,
        data: null
      }
    }
  }

  async findByQuery(query: string, language: string) {
    try {
      const movies: MoviesQueryApiDto = await this.axiosService.get(`/search/movie?query=${query}`);
      return {
        status: true,
        msg: 'Query completed successfully',
        meta: {
          page: movies.page,
          total_pages: movies.total_pages,
          total_results: movies.total_results,
        },
        data: movies.results,
      }
    } catch (error) {
      return {
        status: false,
        msg: error.message,
        data: null
      }
    }
  }

  async addFavorite(addFavoriteDto: AddFavoriteDto) {
    try {
      const user = await this.userModel.get({userId: addFavoriteDto.userId});
      if (!user) throw new Error('User not found');
      const movieDB = await this.movieModel.get({movieId: addFavoriteDto.movieId});
      if (!movieDB) {
        const movieApi = await this.axiosService.get(`/movie/${addFavoriteDto.movieId}`);
        const filteredDataMovie: Movie = plainToClass(FilteredDataMovie, movieApi)
        this.movieModel.create(filteredDataMovie)
        await this.favoriteMovieModel.create(addFavoriteDto)
      } else {
        await this.favoriteMovieModel.create(addFavoriteDto)
      }
      return {
        status: true,
        msg: 'Movie successfully added to favorites',
        data: addFavoriteDto,
      }
    } catch (error) {
      return {
        status: false,
        msg: error.message,
        data: null
      }
    }
  }

  async favoritesByUser(id: string) {
    try {
      const user = await this.userModel.get({userId: id});
      if (!user) throw new Error('User not found')
      const favorites = await this.favoriteMovieModel.scan()
      .where('userId')
      .eq(user.userId)
      .exec()
      return {
        status: true,
        msg: 'Query completed successfully',
        data: favorites,
      }
    } catch (error) {
      return {
        status: false,
        msg: error.message,
        data: null
      }
    }
  }

  async addNote(addNoteDto: AddNoteDto) {
    try {
      const user = await this.userModel.get({userId: addNoteDto.userId});
      if (!user) throw new Error('User not found');
      const movieDB = await this.movieModel.get({movieId: addNoteDto.movieId});
      if (!movieDB) {
        const movieApi = await this.axiosService.get(`/movie/${addNoteDto.movieId}`);
        const filteredDataMovie: Movie = plainToClass(FilteredDataMovie, movieApi)
        await this.movieModel.create(filteredDataMovie)
        await this.movieNoteModel.create(addNoteDto)
      } else {
        await this.movieNoteModel.create(addNoteDto)
      }
      return {
        status: true,
        msg: 'Note added to film successfully',
        data: addNoteDto,
      }
    } catch (error) {
      return {
        status: false,
        msg: error.message,
        data: null
      }
    }
  }

  async notesByMovie(id: number) {
    try {
      const movie = await this.movieModel.get({movieId: id});
      if (!movie) throw new Error('Movie not found');
      const notes = await this.movieNoteModel.scan()
      .where('movieId')
      .eq(movie.movieId)
      .exec()
      return {
        status: true,
        msg: 'Query completed successfully',
        data: notes,
      }
    } catch (error) {
      return {
        status: false,
        msg: error.message,
        data: null
      }
    }
  }

  async movieExists(movieId: number) {
    try {
      const movie = await this.movieModel.get({movieId});
      return Boolean(movie);
    } catch (error) {
      return false;
    }
  }
}
