import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { TodoService } from '../service/Todo.service';
import type { TodoProps } from '../types/todo';

export default function TodoApp() {
    const [title, setTitle] = useState('');
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryKey: [TodoService.QUERY_KEY],
        queryFn: TodoService.getTodo,
    });

    const createMutation = useMutation({
        mutationFn: TodoService.createTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [TodoService.QUERY_KEY] });
            setTitle('');
        },
    });

    const updateMutation = useMutation({
        mutationFn: TodoService.updateTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [TodoService.QUERY_KEY] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: TodoService.deleteTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [TodoService.QUERY_KEY] });
        },
    });

    const handleAddTodo = () => {
        if (!title.trim()) return;

        createMutation.mutate({
            title: title.trim(),
            completed: false,
        });
    };

    const handleToggleTodo = (todo: TodoProps) => {
        updateMutation.mutate({
            ...todo,
            completed: !todo.completed,
        });
    };

    const handleDeleteTodo = (id: number) => {
        deleteMutation.mutate(id);
    };

    if (isLoading || !data) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">📝 Todo List</h1>

            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="What needs to be done?"
                />
                <button
                    className={`bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-5 py-2 rounded-xl shadow hover:brightness-110 transition ${
                        title.trim() === '' ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={handleAddTodo}
                    disabled={title.trim() === '' || createMutation.isPending}
                >
                    {createMutation.isPending ? 'Adding...' : 'Add'}
                </button>
            </div>

            {createMutation.isError && (
                <p className="text-red-500 mb-4">Error adding todo: {createMutation.error.message}</p>
            )}

            {data.length === 0 ? (
                <p className="text-center text-gray-400 italic">No tasks yet. Start by adding one above.</p>
            ) : (
                <ul className="space-y-3">
                    {data.map((todo) => (
                        <li
                            key={todo.id}
                            className="flex items-center justify-between px-4 py-3 bg-gray-100 rounded-xl shadow-sm"
                        >
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => handleToggleTodo(todo)}
                                    className="h-4 w-4 accent-blue-600"
                                />
                                <div>
                                    <p
                                        className={`text-lg font-medium ${
                                            todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
                                        }`}
                                    >
                                        {todo.title}
                                    </p>
                                    <span
                                        className={`text-xs font-semibold inline-block px-2 py-1 rounded-full ${
                                            todo.completed
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-yellow-100 text-yellow-700'
                                        }`}
                                    >
                                        {todo.completed ? 'Completed' : 'Pending'}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDeleteTodo(todo.id)}
                                className="text-red-500 hover:text-red-600 transition text-xl"
                                disabled={deleteMutation.isPending}
                            >
                                ✕
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
