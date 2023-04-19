import api from "..";
import { IPost } from "../../models/IPost";

export class PostService {

  static async createPost(file: Blob): Promise<IPost> {
    const { data } = await api.post('/posts', { file }, {
      headers: {'Content-Type': 'multipart/form-data' },
    });

    return data;
  }

  static async listPosts(page: number): Promise<{
    result: IPost[],
    currentPage: number,
    totalPages: number,
    totalRegisters: number
  }> {
    const { data } = await api.get(`/posts?l=10&p=${page}`);

    return data;
  }
}
