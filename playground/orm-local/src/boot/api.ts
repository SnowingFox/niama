import { apiBootS } from '@niama/api-client';
import { Dict, Maybe } from '@niama/core';
import { getNavInitialData, getNavRS } from '@niama/nav-client';

import { menus } from '@/assets/data/f.menus';
import { posts } from '@/assets/data/posts';
import { postApi } from '@/modules/post/f.post.helper';
import { PostR } from '@/modules/post/post.types';

function processWhere<R>(where: Dict<any>, item: R): boolean {
  return Object.keys(where).every((condition) => {
    const [prop, keyword] = condition.split('_');
    if (!keyword) return item[prop] === where[condition];
    if (keyword === 'in') return where[condition].includes(item[prop]);
    return true;
  });
}

export default apiBootS({
  initial: () => ({ ...getNavInitialData(menus), posts }),
  resolvers: [
    getNavRS(),
    {
      Query: {
        post: async (_: any, { where: { id } }: any, { cache }: any): Promise<Maybe<PostR>> => {
          const data: Maybe<{ posts: PostR[] }> = cache.readQuery({ query: postApi.requests.readAll() });
          // await new Promise((r) => setTimeout(r, 3000));
          return data ? data.posts.find((resource) => resource.id === id) || null : null;
        },
        posts: async (_: any, { first, orderBy, skip, where }: any, { cache }: any): Promise<PostR[]> => {
          console.log('resolver : posts', first, skip, where);
          const data: Maybe<{ posts: PostR[] }> = cache.readQuery({ query: postApi.requests.readAll() });
          if (!data || !data.posts) return [];
          let result = data.posts;
          if (where) result = result.filter((post) => processWhere(where, post));
          if (first || skip) result = result.slice(skip, skip + first);
          await new Promise((r) => setTimeout(r, 2000));
          return result;
        },
        postsCount: (_: any, { where }: any, { cache }: any): number => {
          console.log('resolver : postsCount', where);
          const data: Maybe<{ posts: PostR[] }> = cache.readQuery({ query: postApi.requests.readAll() });
          if (!data || !data.posts) return 0;
          let result = data.posts;
          if (where) result = result.filter((post) => processWhere(where, post));
          return result.length;
        },
      },
      Mutation: {
        deletePost: (_: any, { where: { id } }: any, { cache }: any) => {
          // const data: Maybe<{ posts: PostR[] }> = cache.readQuery({ query: postApi.requests.readAll() });
          // if (!data || !data.posts) return;
          // cache.writeQuery({ query: postApi.requests.readAll(), data: { posts: data.posts.filter((post) => post.id !== id) } });
          // console.log(data.posts.filter((post) => post.id !== id).length);
          // console.log(cache.data.data.ROOT_QUERY);
        },
      },
    },
  ],
});
