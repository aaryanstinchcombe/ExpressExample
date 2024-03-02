import express from 'express';
import { PrismaClient, posts, users } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

type CreateUser = {
	email: string;
	name: string;
	age: number;
};

type CreatePost = {
	email: string;
	title: string;
	content: string;
	date?: Date;
};

type Success = { success: true };
type Fail = { success: false; error: string };

type UserSuccess = Success & {
	data: users;
};

type PostSuccess = Success & {
	data: posts;
};

router.post('/user', async (req, res) => {
	try {
		const newUser: CreateUser = req.body;
		console.log(newUser);
		const userSuccess: UserSuccess = {
			success: true,
			data: await prisma.users.create({ data: newUser }),
		};
		return res.json(userSuccess);
	} catch (err) {
		return res.status(400).json({ success: false, error: (err as Error).message });
	}
});

router.post('/post', async (req, res) => {
	try {
		const newPost: CreatePost = req.body;
		const postSuccess: PostSuccess = {
			success: true,
			data: await prisma.posts.create({
				data: { ...newPost, date: new Date() },
			}),
		};
		return res.json(postSuccess);
	} catch (err) {
		const errorResponse: Fail = {
			success: false,
			error: (err as Error).message,
		};
		return res.status(400).json(errorResponse);
	}
});

router.get('/', async (req, res) => {
	return res.json(await prisma.users.findMany({ include: { posts: true } }));
});

export default router;
