import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';

// nest g resource module명
@Controller('posts')
export class PostsController {
  // provider
  // nest.js IoC Container 에서 자동으로 주입해준다.
  constructor(private readonly postsService: PostsService) {}

  // Get /posts
  // 전체 post 리턴
  @Get()
  getPosts() {
    return this.postsService.getAllPost();
  }

  // Get /post/:id
  // post 특정 id 리턴
  @Get(':id')
  getPost(@Param('id') postId: string) {
    return this.postsService.getPostById(+postId);
  }

  // Post /posts
  @Post()
  postPosts(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    return this.postsService.createPost(author, title, content);
  }

  @Put(':id')
  putPost(
    @Param('id') postId: string,
    @Body('author') author?: string,
    @Body('title') title?: string,
    @Body('content') content?: string,
  ) {
    return this.postsService.updatePost(+postId, author, title, content);
  }

  // Delete
  @Delete(':id')
  deletePosts(@Param('id') postId: string) {
    return this.postsService.deletePost(+postId);
  }
}
