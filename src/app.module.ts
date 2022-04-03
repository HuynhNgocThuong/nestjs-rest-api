import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    PostModule,
    MongooseModule.forRoot('mongodb://localhost/blog')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
