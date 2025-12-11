import {Router} from 'express';
import { UserRoute } from '../../module/auth/user.route.ts';
import { CollectionRoute } from '../../module/collections/collection/collection.route.ts';
import { TagRoute } from '../../module/tags/tag.route.ts';
import { BookmarkRoute } from '../../module/collections/bookmark/bookmark.route.ts';
import { CommentRoutes } from '../../module/comments/comment.route.ts';
import { LikeRoutes } from '../../module/Likes/like.route.ts';
import { SETTINGS } from '../../../config/settings.config.ts';

const router: Router = Router();

// Lista de rutas de la API
export const ApiRoutes = {
    user: router.use(`${SETTINGS.BASE_URL}/auth`, UserRoute),
    collections: {
        collection: router.use(`${SETTINGS.BASE_URL}/collections`, CollectionRoute),
        bookmark: router.use(`${SETTINGS.BASE_URL}/bookmarks`, BookmarkRoute),
        tag: router.use(`${SETTINGS.BASE_URL}/tags`, TagRoute),
    },
    likes: router.use(`${SETTINGS.BASE_URL}/likes`, LikeRoutes),
    comments: router.use(`${SETTINGS.BASE_URL}/comments`, CommentRoutes),
}