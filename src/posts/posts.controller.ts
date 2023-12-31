import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';

interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

let posts: PostModel[] = [
  {
    id: 1,
    author: 'newjeans',
    title: '뉴진스',
    content: '뉴진스 컴백',
    likeCount: 3300,
    commentCount: 30000,
  },
  {
    id: 2,
    author: 'newjeans',
    title: '뉴진스',
    content: '뉴진스 컴백',
    likeCount: 3300,
    commentCount: 30000,
  },
  {
    id: 3,
    author: 'blackpink',
    title: '블랙핑크',
    content: '블핑 컴백',
    likeCount: 3300,
    commentCount: 30000,
  },
];

// nest g resource module명
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // Get /posts
  // 전체 post 리턴
  @Get()
  getPosts(): PostModel[] {
    return posts;
  }

  // Get /post/:id
  // post 특정 id 리턴
  @Get(':id')
  getPost(@Param('id') postId: string) {
    const post = posts.find(({ id }) => id === +postId);
    if (!post)
      throw new NotFoundException('해당하는 post 가 존재하지 않습니다.');

    return post;
  }

  // Post /posts
  @Post()
  postPosts(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    const post: PostModel = {
      id: posts[Post.length - 1].id + 1,
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    };

    posts = [...posts, post];

    return post;
  }

  @Put(':id')
  putPost(
    @Param('id') postId: string,
    @Body('author') author?: string,
    @Body('title') title?: string,
    @Body('content') content?: string,
  ) {
    const post = posts.find(({ id }) => +postId === id);

    if (!post) throw new NotFoundException();

    if (author) post.author = author;
    if (title) post.title = title;
    if (content) post.content = content;

    posts = posts.map((prevPost) =>
      prevPost.id === +postId ? post : prevPost,
    );

    return post;
  }

  // Delete
  @Delete(':id')
  deletePosts(@Param('id') postId: string) {
    const post = posts.find(({ id }) => +postId === id);

    if (!post) throw new NotFoundException();

    posts = posts.filter(({ id }) => +postId !== id);

    return postId;
  }
}
