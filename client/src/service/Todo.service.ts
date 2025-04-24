// Todo.service.js
import { ApiRoute } from '../constant/ApiConst';
import { fetchClient } from '../lib/axios';
import type { TodoProps } from '../types/todo';

export const TodoService = {
    QUERY_KEY: 'todo',

    getTodo: async (): Promise<TodoProps[]> => {
        const res = await fetchClient.get(ApiRoute.TODO);
        return res.data;
    },

    createTodo: async (data: Omit<TodoProps, 'id' | 'created_at' | 'updated_at'>): Promise<TodoProps> => {
        const res = await fetchClient.post(ApiRoute.TODO, data);
        return res.data;
    },

    updateTodo: async (data: TodoProps): Promise<TodoProps> => {
        const res = await fetchClient.put(`${ApiRoute.TODO}/${data.id}`, data);
        return res.data;
    },

    deleteTodo: async (id: number): Promise<void> => {
        await fetchClient.delete(`${ApiRoute.TODO}/${id}`);
    },
};
