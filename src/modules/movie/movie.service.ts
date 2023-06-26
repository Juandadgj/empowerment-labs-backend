import { Injectable } from '@nestjs/common';
import { Model, InjectModel } from 'nestjs-dynamoose';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie, MovieKey } from '../../shared/interfaces/movie.interface';
import { AxiosService } from 'src/services/axios.service';

@Injectable()
export class MovieService {
  constructor(
    private readonly axiosService: AxiosService,
    @InjectModel('Movie')
    private readonly movieModel: Model<Movie, MovieKey>
  ) {}

  async findPopulars() {
    return await this.axiosService.get('/movie/popular')
  }

  async findByTitle(query: string, language: string) {
    return await this.axiosService.get(`/search/movie?query=${query}`);
  }
}
