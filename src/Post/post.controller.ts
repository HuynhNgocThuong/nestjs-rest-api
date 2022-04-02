import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { Observable, take, toArray } from 'rxjs';
import { Post as BlogPost} from './post.interface';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
    constructor(private postService: PostService) {}
    @Get('')
  getAllPosts(@Query('q') keyword?: string): Observable<BlogPost[]> {
    return this.postService.findAll(keyword).pipe(take(10), toArray());
  }

  @Get(':id')
  getPostById(@Param('id', ParseIntPipe) id: number): Observable<BlogPost> {
    return this.postService.findById(id);
  }

  @Post('')
  createPost(@Body() post: BlogPost):Observable<BlogPost[]> {
    return this.postService.save(post).pipe(toArray());
  }

  @Put(':id')
  updatePost(@Param('id', ParseIntPipe) id: number, @Body() post: BlogPost): Observable<BlogPost[]> {
    return this.postService.update(id, post).pipe(toArray());
  }

  @Delete(':id')
  deletePostById(@Param('id', ParseIntPipe) id: number): Observable<boolean> {
    return this.postService.deleteById(id);
  }
}
