import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { MovieService } from './movie.service';
import { AddFavoriteDto } from './dto/add-favorite.dto';
import { AddNoteDto } from './dto/add-note.dto';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('popular')
  findPopulars() {
    return this.movieService.findPopulars();
  }

  @Get('search')
  findByQuery(@Query('query') query: string) {
    return this.movieService.findByQuery(query, null);
  }

  @Get('favorites/:id')
  favoritesByUser(@Param('id') id: string) {
    return this.movieService.favoritesByUser(id)
  }

  @Get('notes/:id')
  notesByMovie(@Param('id') id: string) {
    return this.movieService.notesByMovie(+id)
  }

  @Post('favorite')
  addFavorite(@Body() addFavoriteDto: AddFavoriteDto) {
    return this.movieService.addFavorite(addFavoriteDto);
  }

  @Post('note')
  addNote(@Body() addNoteDto: AddNoteDto) {
    return this.movieService.addNote(addNoteDto)
  }
}
