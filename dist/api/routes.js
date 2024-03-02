"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.post('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = req.body;
        console.log(newUser);
        const userSuccess = {
            success: true,
            data: yield prisma.users.create({ data: newUser }),
        };
        return res.json(userSuccess);
    }
    catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
}));
router.post('/post', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPost = req.body;
        const postSuccess = {
            success: true,
            data: yield prisma.posts.create({
                data: Object.assign(Object.assign({}, newPost), { date: new Date() }),
            }),
        };
        return res.json(postSuccess);
    }
    catch (err) {
        const errorResponse = {
            success: false,
            error: err.message,
        };
        return res.status(400).json(errorResponse);
    }
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json(yield prisma.users.findMany({ include: { posts: true } }));
}));
exports.default = router;
