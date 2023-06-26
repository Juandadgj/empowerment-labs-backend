import { Injectable } from '@nestjs/common';
import { Model, InjectModel } from 'nestjs-dynamoose';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie, MovieKey } from '../../shared/interfaces/movie.interface';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel('Movie')
    private readonly movieModel: Model<Movie, MovieKey>
  ) {}

  create(createMovieDto: CreateMovieDto) {
    return 'This action adds a new movie';
  }

  async findAll() {
    return await this.movieModel.scan().exec();;
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
