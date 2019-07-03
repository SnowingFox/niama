import { query } from '@niama/api/front';
import { getLabels } from '@niama/orm';
import { getRequests } from '@niama/orm/front';
import gql from 'graphql-tag';

// API =====================================================================================================================================

export const labels: N.OrmLabels = getLabels('post');
const fields: any = ['body', 'id', 'title', 'userId'];
// const requests: N.OrmRequests<any> = getRequests(fields, labels);

const requests: any = {
  count: gql`
    query postsCount {
      postsCount @rest(path: "/posts?_limit=0")
    }
  `,
  create: gql`
    mutation createPost($data: PostCreateInput!) {
      createPost(data: $data) @rest(type: "Post", path: "/posts", method: "POST", bodyKey: "data") {
        id
      }
    }
  `,
  readMany: () => gql`
    query posts($start: Integer!) {
      posts(start: $start) @rest(type: "Post", path: "/posts?_limit=20&_start={args.start}") {
        body
        id
        title
      }
    }
  `,
};

/*query([
  {
    fields: ['body', 'id', 'title'],
    rest: { type: 'Post', path: '/posts?_limit=20&_start={args.start}' },
    selector: 'posts',
    varTypes: { start: 'Integer!' },
  },
]);*/

export const api: N.OrmConfig<any> = { fields, labels, requests };
