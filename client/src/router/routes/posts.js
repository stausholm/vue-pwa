import Index from "@/pages/posts/Index";
import Posts from "@/pages/posts/Posts";
import Post from "@/pages/posts/Post";

export default [
  {
    path: '/posts',
    component: Index,
    meta: {
      isPrimary: true,
      title: "posts",
      icon: () => import('@/components/icons/IconViewList')
    },
    children: [
      {
        path: '',
        name: 'Posts',
        component: Posts,
        meta: {
          usePrimaryTransition: true
        }
      },
      {
        path: ":id",
        name: "Post",
        component: Post,
        meta: {
          title: 'A post!',
          enableBack: true,
          overwriteScroll: true,
          hideActions: true
        }
      }
    ]
  }
]