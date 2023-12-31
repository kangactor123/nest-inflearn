import { Controller, Get } from '@nestjs/common';
import { PostsService } from './posts.service';

interface Post {
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

// nest g resource module명
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPost(): Post {
    return {
      author: 'newjeans',
      title: '뉴진스',
      content: '뉴진스 컴백',
      likeCount: 3300,
      commentCount: 30000,
    };
  }
}
