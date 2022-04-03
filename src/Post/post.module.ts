import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './post.model';
import { DataInitializerService } from './initialData/data-initializer.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'posts', schema: PostSchema}])
  ],
  providers: [PostService, DataInitializerService],
  controllers: [PostController]
})
export class PostModule {}
