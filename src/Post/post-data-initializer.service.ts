import { PostService } from './post.service';
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { CreatePostDto } from './create-post.dto';

@Injectable()
export class PostDataInitializerService implements OnModuleInit, OnModuleDestroy {
  private data: CreatePostDto[] = [
    {
      title: 'Generate a NestJS project',
      content: 'content',
    },
    {
      title: 'Create CRUD RESTful APIs',
      content: 'content',
    },
    {
      title: 'Connect to MongoDB',
      content: 'content',
    },
  ];

  constructor(private postService: PostService) {}
  onModuleInit(): void {
    console.log('(PostModule) is initialized...');
    this.data.forEach(d => {
      this.postService.save(d).subscribe(saved => console.log(saved));
    });
  }
  onModuleDestroy(): void {
    console.log('(PostModule) is being destroyed...');
    this.postService
      .deleteAll()
      .subscribe(del => console.log(`deleted ${del.deletedCount} rows`));
  }
  // onApplicationBootstrap(): void {
  //   this.data.forEach(d => {
  //     this.save(d).subscribe(saved => console.log(saved));
  //   });
  // }
  // onApplicationShutdown(signal?: string): void {
  //   console.log(signal);
  //   this.postModel.deleteMany({}).exec();
  // }
}
