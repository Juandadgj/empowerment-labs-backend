import { Controller, Get, Query } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  findAll() {
    return this.movieService.findPopulars();
  }

  @Get('search')
  findOne(@Query('query') query: string) {
    return this.movieService.findByTitle(query, null);
  }

}
