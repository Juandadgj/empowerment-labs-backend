import { Controller, Get, Post, Param, Query, Body, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MovieService } from './movie.service';
import { AddFavoriteDto } from './dto/add-favorite.dto';
import { AddNoteDto } from './dto/add-note.dto';
import { MoviesQueryDto } from './dto/popular-movies.dto';

@ApiTags('Movies')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiOperation({ summary: 'Get the most popular movies' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Most popular movies consulted successfully',
    type: MoviesQueryDto,
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('popular')
  findPopulars() {
    return this.movieService.findPopulars();
  }

  @ApiOperation({ summary: 'Obtain movies by title or overview' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Query completed successfully',
    type: MoviesQueryDto,
  })
  @ApiQuery({ name: 'query', description: 'Word or phrase to search' })
  @UseGuards(AuthGuard('jwt'))
  @Get('search')
  findByQuery(@Query('query') query: string) {
    return this.movieService.findByQuery(query, null);
  }

  @ApiOperation({ summary: 'Get favorite movies by user' })
  @ApiParam({ name: 'id', description: 'ID of the user to be consulted.' })
  @UseGuards(AuthGuard('jwt'))
  @Get('favorites/:id')
  favoritesByUser(@Param('id') id: string) {
    return this.movieService.favoritesByUser(id);
  }

  @ApiOperation({ summary: 'Get user ratings per movie' })
  @ApiParam({ name: 'id', description: 'ID of the film to be consulted' })
  @UseGuards(AuthGuard('jwt'))
  @Get('notes/:id')
  notesByMovie(@Param('id') id: string) {
    return this.movieService.notesByMovie(+id);
  }

  @ApiOperation({ summary: "Add movie to a user's favorites list" })
  @ApiBody({ type: AddFavoriteDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Movie successfully added to favorites',
    type: AddFavoriteDto,
  })
  @UseGuards(AuthGuard('jwt'))
  @Post('favorite')
  addFavorite(@Body() addFavoriteDto: AddFavoriteDto) {
    return this.movieService.addFavorite(addFavoriteDto);
  }

  @ApiOperation({ summary: "Add a user's note to a movie" })
  @ApiBody({ type: AddNoteDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Note added to film successfully',
    type: AddNoteDto,
  })
  @UseGuards(AuthGuard('jwt'))
  @Post('note')
  addNote(@Body() addNoteDto: AddNoteDto) {
    return this.movieService.addNote(addNoteDto);
  }
}
