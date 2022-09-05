import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

type TodosResponse = Todo[];

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    // Void se non ci sono particolari endpoints aggiuntivi (come un id)
    getTodos: builder.query<TodosResponse, void>({
      query: () => '/todos',
      transformResponse: (res: Todo[]) => res.sort((a, b) => b.id - a.id),
      providesTags: ['Todos']
    }),
    addTodo: builder.mutation({
      query: (todo) => ({
        url: '/todos',
        method: 'POST',
        body: todo
      }),
      invalidatesTags: ['Todos']
    }),
    updateTodo: builder.mutation({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: 'PATCH',
        body: todo
      }),
      invalidatesTags: ['Todos']
    }),
    deleteTodo: builder.mutation({
      query: ({ id }) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
        body: id
      }),
      invalidatesTags: ['Todos']
    })
  })
});

console.log(apiSlice)

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation
} = apiSlice;