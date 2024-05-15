import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModel } from './entities/posts.entity';

@Module({
  imports: [
    // model 에 해당되는 레포지토리를 주입할때 forFeature
    TypeOrmModule.forFeature([PostsModel]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
