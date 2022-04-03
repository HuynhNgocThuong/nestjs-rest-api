import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { Observable, take, toArray } from 'rxjs';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as BlogPost} from './post.model';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('')
  getAllPosts(
    @Query('q') keyword?: string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
  ): Observable<BlogPost[]> {
    return this.postService.findAll(keyword, skip, limit);
  }

  @Get(':id')
  getPostById(@Param('id') id: string): Observable<BlogPost> {
    return this.postService.findById(id);
  }

  @Post('')
  createPost(@Body() post: CreatePostDto): Observable<BlogPost> {
    return this.postService.save(post);
  }

  @Put(':id')
  updatePost(
    @Param('id') id: string,
    @Body() post: UpdatePostDto,
  ): Observable<BlogPost> {
    return this.postService.update(id, post);
  }

  @Delete(':id')
  deletePostById(@Param('id') id: string): Observable<BlogPost> {
    return this.postService.deleteById(id);
  }
}
