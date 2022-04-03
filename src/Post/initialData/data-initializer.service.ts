import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { CreatePostDto } from "../dto/create-post.dto";
import { PostService } from "../post.service";

@Injectable()
export class DataInitializerService implements OnModuleInit, OnModuleDestroy {
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
    this.data.forEach(d => {
      this.postService.save(d).subscribe(saved => console.log(saved));
    });
  }
  onModuleDestroy(): void {
    console.log('module is be destroying...');
    this.postService
      .deleteAll()
      .subscribe(del => console.log(`deleted ${del} records.`));
  }

}