import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import axios, { fetcher, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

const enableServer = false;

const KANBAN_ENDPOINT = endpoints.kanban;

const swrOptions = {
  revalidateIfStale: enableServer,
  revalidateOnFocus: enableServer,
  revalidateOnReconnect: enableServer,
};

// ----------------------------------------------------------------------

export function useGetBoard() {
  const { data, isLoading, error, isValidating } = useSWR(KANBAN_ENDPOINT, fetcher, swrOptions);

  const memoizedValue = useMemo(() => {
    const tasks = data?.board.tasks || {
      '1-column-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1': [
        {
          id: '1-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
          due: ['2024-08-06T16:23:09+00:00', '2024-08-07T16:23:09+00:00'],
          status: 'To do',
          labels: [],
          comments: [],
          assignee: [],
          priority: 'low',
          attachments: [],
          reporter: {
            id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b17',
            name: 'Angelique Morse',
            avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-17.webp',
          },
          name: 'Prepare Monthly Financial Report',
          description:
            'Occaecati est et illo quibusdam accusamus qui. Incidunt aut et molestiae ut facere aut. Est quidem iusto praesentium excepturi harum nihil tenetur facilis. Ut omnis voluptates nihil accusantium doloribus eaque debitis.',
        },
        {
          id: '2-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
          due: ['2024-08-07T16:23:09+00:00', '2024-08-08T16:23:09+00:00'],
          status: 'To do',
          labels: ['Technology'],
          comments: [
            {
              id: '36bee4c4-8ff2-4d84-8c08-d0d3d782848c',
              name: 'Jayvion Simon',
              createdAt: '2024-08-05T16:23:09+00:00',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-1.webp',
              messageType: 'text',
              message:
                'The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.',
            },
          ],
          assignee: [
            {
              id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
              name: 'Jayvion Simon',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-1.webp',
            },
          ],
          priority: 'hight',
          attachments: [
            'https://api-dev-minimal-v6.vercel.app/assets/images/cover/cover-12.webp',
            'https://api-dev-minimal-v6.vercel.app/assets/images/cover/cover-13.webp',
            'https://api-dev-minimal-v6.vercel.app/assets/images/cover/cover-14.webp',
            'https://api-dev-minimal-v6.vercel.app/assets/images/cover/cover-15.webp',
          ],
          reporter: {
            id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b17',
            name: 'Angelique Morse',
            avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-17.webp',
          },
          name: 'Design New Marketing Campaign',
          description:
            'Atque eaque ducimus minima distinctio velit. Laborum et veniam officiis. Delectus ex saepe hic id laboriosam officia. Odit nostrum qui illum saepe debitis ullam. Laudantium beatae modi fugit ut. Dolores consequatur beatae nihil voluptates rem maiores.',
        },
        {
          id: '3-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
          due: ['2024-08-08T16:23:09+00:00', '2024-08-09T16:23:09+00:00'],
          status: 'To do',
          labels: ['Technology', 'Health and Wellness'],
          comments: [
            {
              id: '36bee4c4-8ff2-4d84-8c08-d0d3d782848c',
              name: 'Jayvion Simon',
              createdAt: '2024-08-05T16:23:09+00:00',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-1.webp',
              messageType: 'text',
              message:
                'The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.',
            },
            {
              id: 'dceb35af-ea44-420f-ae22-964728479bdc',
              name: 'Lucian Obrien',
              createdAt: '2024-08-04T15:23:09+00:00',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-2.webp',
              messageType: 'image',
              message: 'https://api-dev-minimal-v6.vercel.app/assets/images/cover/cover-7.webp',
            },
          ],
          assignee: [
            {
              id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
              name: 'Jayvion Simon',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-1.webp',
            },
            {
              id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
              name: 'Lucian Obrien',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-2.webp',
            },
          ],
          priority: 'medium',
          attachments: [],
          reporter: {
            id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b17',
            name: 'Angelique Morse',
            avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-17.webp',
          },
          name: 'Analyze Customer Feedback',
          description:
            'Rerum eius velit dolores. Explicabo ad nemo quibusdam. Voluptatem eum suscipit et ipsum et consequatur aperiam quia. Rerum nulla sequi recusandae illum velit quia quas. Et error laborum maiores cupiditate occaecati.',
        },
      ],
      '2-column-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2': [
        {
          id: '4-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
          due: ['2024-08-09T16:23:09+00:00', '2024-08-10T16:23:09+00:00'],
          status: 'In progress',
          labels: ['Technology', 'Health and Wellness', 'Travel'],
          comments: [
            {
              id: '36bee4c4-8ff2-4d84-8c08-d0d3d782848c',
              name: 'Jayvion Simon',
              createdAt: '2024-08-05T16:23:09+00:00',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-1.webp',
              messageType: 'text',
              message:
                'The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.',
            },
            {
              id: 'dceb35af-ea44-420f-ae22-964728479bdc',
              name: 'Lucian Obrien',
              createdAt: '2024-08-04T15:23:09+00:00',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-2.webp',
              messageType: 'image',
              message: 'https://api-dev-minimal-v6.vercel.app/assets/images/cover/cover-7.webp',
            },
            {
              id: '4a4fb89e-5a41-4b8a-b916-379794f162b6',
              name: 'Deja Brady',
              createdAt: '2024-08-03T14:23:09+00:00',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-3.webp',
              messageType: 'image',
              message: 'https://api-dev-minimal-v6.vercel.app/assets/images/cover/cover-8.webp',
            },
          ],
          assignee: [
            {
              id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
              name: 'Jayvion Simon',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-1.webp',
            },
            {
              id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
              name: 'Lucian Obrien',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-2.webp',
            },
            {
              id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
              name: 'Deja Brady',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-3.webp',
            },
          ],
          priority: 'hight',
          attachments: [],
          reporter: {
            id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b17',
            name: 'Angelique Morse',
            avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-17.webp',
          },
          name: 'Update Website Content',
          description:
            'Et non omnis qui. Qui sunt deserunt dolorem aut velit cumque adipisci aut enim. Nihil quis quisquam nesciunt dicta nobis ab aperiam dolorem repellat. Voluptates non blanditiis. Error et tenetur iste soluta cupiditate ratione perspiciatis et. Quibusdam aliquid nam sunt et quisquam non esse.',
        },
        {
          id: '5-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
          due: ['2024-08-10T16:23:09+00:00', '2024-08-11T16:23:09+00:00'],
          status: 'In progress',
          labels: ['Technology', 'Health and Wellness', 'Travel', 'Finance'],
          comments: [
            {
              id: '36bee4c4-8ff2-4d84-8c08-d0d3d782848c',
              name: 'Jayvion Simon',
              createdAt: '2024-08-05T16:23:09+00:00',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-1.webp',
              messageType: 'text',
              message:
                'The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.',
            },
            {
              id: 'dceb35af-ea44-420f-ae22-964728479bdc',
              name: 'Lucian Obrien',
              createdAt: '2024-08-04T15:23:09+00:00',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-2.webp',
              messageType: 'image',
              message: 'https://api-dev-minimal-v6.vercel.app/assets/images/cover/cover-7.webp',
            },
            {
              id: '4a4fb89e-5a41-4b8a-b916-379794f162b6',
              name: 'Deja Brady',
              createdAt: '2024-08-03T14:23:09+00:00',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-3.webp',
              messageType: 'image',
              message: 'https://api-dev-minimal-v6.vercel.app/assets/images/cover/cover-8.webp',
            },
            {
              id: 'd6ea5a96-4303-4440-85dc-c5e9794426dd',
              name: 'Harrison Stein',
              createdAt: '2024-08-02T13:23:09+00:00',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-4.webp',
              messageType: 'text',
              message: 'The aroma of freshly brewed coffee filled the air, awakening my senses.',
            },
          ],
          assignee: [
            {
              id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
              name: 'Jayvion Simon',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-1.webp',
            },
            {
              id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
              name: 'Lucian Obrien',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-2.webp',
            },
            {
              id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
              name: 'Deja Brady',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-3.webp',
            },
            {
              id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
              name: 'Harrison Stein',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-4.webp',
            },
          ],
          priority: 'medium',
          attachments: [],
          reporter: {
            id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b17',
            name: 'Angelique Morse',
            avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-17.webp',
          },
          name: 'Conduct Market Research',
          description:
            'Nihil ea sunt facilis praesentium atque. Ab animi alias sequi molestias aut velit ea. Sed possimus eos. Et est aliquid est voluptatem.',
        },
      ],
      '3-column-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3': [],
      '4-column-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4': [
        {
          id: '6-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6',
          due: ['2024-08-11T16:23:09+00:00', '2024-08-12T16:23:09+00:00'],
          status: 'Done',
          labels: ['Technology', 'Health and Wellness', 'Travel', 'Finance', 'Education'],
          comments: [
            {
              id: '36bee4c4-8ff2-4d84-8c08-d0d3d782848c',
              name: 'Jayvion Simon',
              createdAt: '2024-08-05T16:23:09+00:00',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-1.webp',
              messageType: 'text',
              message:
                'The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.',
            },
            {
              id: 'dceb35af-ea44-420f-ae22-964728479bdc',
              name: 'Lucian Obrien',
              createdAt: '2024-08-04T15:23:09+00:00',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-2.webp',
              messageType: 'image',
              message: 'https://api-dev-minimal-v6.vercel.app/assets/images/cover/cover-7.webp',
            },
            {
              id: '4a4fb89e-5a41-4b8a-b916-379794f162b6',
              name: 'Deja Brady',
              createdAt: '2024-08-03T14:23:09+00:00',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-3.webp',
              messageType: 'image',
              message: 'https://api-dev-minimal-v6.vercel.app/assets/images/cover/cover-8.webp',
            },
            {
              id: 'd6ea5a96-4303-4440-85dc-c5e9794426dd',
              name: 'Harrison Stein',
              createdAt: '2024-08-02T13:23:09+00:00',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-4.webp',
              messageType: 'text',
              message: 'The aroma of freshly brewed coffee filled the air, awakening my senses.',
            },
            {
              id: 'd63c340e-f5b0-494d-ba06-1e919b27ccdf',
              name: 'Reece Chung',
              createdAt: '2024-08-01T12:23:09+00:00',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-5.webp',
              messageType: 'text',
              message:
                'The children giggled with joy as they ran through the sprinklers on a hot summer day.',
            },
          ],
          assignee: [
            {
              id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
              name: 'Jayvion Simon',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-1.webp',
            },
            {
              id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
              name: 'Lucian Obrien',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-2.webp',
            },
            {
              id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
              name: 'Deja Brady',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-3.webp',
            },
            {
              id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
              name: 'Harrison Stein',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-4.webp',
            },
            {
              id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
              name: 'Reece Chung',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-5.webp',
            },
          ],
          priority: 'low',
          attachments: [
            'https://api-dev-minimal-v6.vercel.app/assets/images/cover/cover-5.webp',
            'https://api-dev-minimal-v6.vercel.app/assets/images/cover/cover-6.webp',
            'https://api-dev-minimal-v6.vercel.app/assets/images/cover/cover-7.webp',
            'https://api-dev-minimal-v6.vercel.app/assets/images/cover/cover-8.webp',
            'https://api-dev-minimal-v6.vercel.app/assets/images/cover/cover-9.webp',
          ],
          reporter: {
            id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b17',
            name: 'Angelique Morse',
            avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-17.webp',
          },
          name: 'Develop Software Application',
          description:
            'Non rerum modi. Accusamus voluptatem odit nihil in. Quidem et iusto numquam veniam culpa aperiam odio aut enim. Quae vel dolores. Pariatur est culpa veritatis aut dolorem.',
        },
      ],
    };
    const columns = data?.board.columns || [
      {
        id: '1-column-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
        name: 'To do',
      },
      {
        id: '2-column-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
        name: 'In progress',
      },
      {
        id: '3-column-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
        name: 'Ready to test',
      },
      {
        id: '4-column-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
        name: 'Done',
      },
    ];

    return {
      board: { tasks, columns },

      boardLoading: isLoading,
      boardError: error,
      boardValidating: isValidating,
      boardEmpty: !isLoading && !columns.length,
    };
  }, [data?.board.columns, data?.board.tasks, error, isLoading, isValidating]);

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function createColumn(columnData) {
  /**
   * Work on server
   */
  if (enableServer) {
    const data = { columnData };
    await axios.post(KANBAN_ENDPOINT, data, { params: { endpoint: 'create-column' } });
  }

  /**
   * Work in local
   */
  mutate(
    KANBAN_ENDPOINT,
    (currentData) => {
      const { board } = currentData;

      // add new column in board.columns
      const columns = [...board.columns, columnData];

      // add new task in board.tasks
      const tasks = { ...board.tasks, [columnData.id]: [] };

      return { ...currentData, board: { ...board, columns, tasks } };
    },
    false
  );
}

// ----------------------------------------------------------------------

export async function updateColumn(columnId, columnName) {
  /**
   * Work on server
   */
  if (enableServer) {
    const data = { columnId, columnName };
    await axios.post(KANBAN_ENDPOINT, data, { params: { endpoint: 'update-column' } });
  }

  /**
   * Work in local
   */
  mutate(
    KANBAN_ENDPOINT,
    (currentData) => {
      const { board } = currentData;

      const columns = board.columns.map((column) =>
        column.id === columnId
          ? {
              // Update data when found
              ...column,
              name: columnName,
            }
          : column
      );

      return { ...currentData, board: { ...board, columns } };
    },
    false
  );
}

// ----------------------------------------------------------------------

export async function moveColumn(updateColumns) {
  /**
   * Work in local
   */
  mutate(
    KANBAN_ENDPOINT,
    (currentData) => {
      const { board } = currentData;

      return { ...currentData, board: { ...board, columns: updateColumns } };
    },
    false
  );

  /**
   * Work on server
   */
  if (enableServer) {
    const data = { updateColumns };
    await axios.post(KANBAN_ENDPOINT, data, { params: { endpoint: 'move-column' } });
  }
}

// ----------------------------------------------------------------------

export async function clearColumn(columnId) {
  /**
   * Work on server
   */
  if (enableServer) {
    const data = { columnId };
    await axios.post(KANBAN_ENDPOINT, data, { params: { endpoint: 'clear-column' } });
  }

  /**
   * Work in local
   */
  mutate(
    KANBAN_ENDPOINT,
    (currentData) => {
      const { board } = currentData;

      // remove all tasks in column
      const tasks = { ...board.tasks, [columnId]: [] };

      return { ...currentData, board: { ...board, tasks } };
    },
    false
  );
}

// ----------------------------------------------------------------------

export async function deleteColumn(columnId) {
  /**
   * Work on server
   */
  if (enableServer) {
    const data = { columnId };
    await axios.post(KANBAN_ENDPOINT, data, { params: { endpoint: 'delete-column' } });
  }

  /**
   * Work in local
   */
  mutate(
    KANBAN_ENDPOINT,
    (currentData) => {
      const { board } = currentData;

      // delete column in board.columns
      const columns = board.columns.filter((column) => column.id !== columnId);

      // delete tasks by column deleted
      const tasks = Object.keys(board.tasks)
        .filter((key) => key !== columnId)
        .reduce((obj, key) => {
          obj[key] = board.tasks[key];
          return obj;
        }, {});

      return { ...currentData, board: { ...board, columns, tasks } };
    },
    false
  );
}

// ----------------------------------------------------------------------

export async function createTask(columnId, taskData) {
  /**
   * Work on server
   */
  if (enableServer) {
    const data = { columnId, taskData };
    await axios.post(KANBAN_ENDPOINT, data, { params: { endpoint: 'create-task' } });
  }

  /**
   * Work in local
   */
  mutate(
    KANBAN_ENDPOINT,
    (currentData) => {
      const { board } = currentData;

      // add task in board.tasks
      const tasks = { ...board.tasks, [columnId]: [taskData, ...board.tasks[columnId]] };

      return { ...currentData, board: { ...board, tasks } };
    },
    false
  );
}

// ----------------------------------------------------------------------

export async function updateTask(columnId, taskData) {
  /**
   * Work on server
   */
  if (enableServer) {
    const data = { columnId, taskData };
    await axios.post(KANBAN_ENDPOINT, data, { params: { endpoint: 'update-task' } });
  }

  /**
   * Work in local
   */
  mutate(
    KANBAN_ENDPOINT,
    (currentData) => {
      const { board } = currentData;

      // tasks in column
      const tasksInColumn = board.tasks[columnId];

      // find and update task
      const updateTasks = tasksInColumn.map((task) =>
        task.id === taskData.id
          ? {
              // Update data when found
              ...task,
              ...taskData,
            }
          : task
      );

      const tasks = { ...board.tasks, [columnId]: updateTasks };

      return { ...currentData, board: { ...board, tasks } };
    },
    false
  );
}

// ----------------------------------------------------------------------

export async function moveTask(updateTasks) {
  /**
   * Work in local
   */
  mutate(
    KANBAN_ENDPOINT,
    (currentData) => {
      const { board } = currentData;

      // update board.tasks
      const tasks = updateTasks;

      return { ...currentData, board: { ...board, tasks } };
    },
    false
  );

  /**
   * Work on server
   */
  if (enableServer) {
    const data = { updateTasks };
    await axios.post(KANBAN_ENDPOINT, data, { params: { endpoint: 'move-task' } });
  }
}

// ----------------------------------------------------------------------

export async function deleteTask(columnId, taskId) {
  /**
   * Work on server
   */
  if (enableServer) {
    const data = { columnId, taskId };
    await axios.post(KANBAN_ENDPOINT, data, { params: { endpoint: 'delete-task' } });
  }

  /**
   * Work in local
   */
  mutate(
    KANBAN_ENDPOINT,
    (currentData) => {
      const { board } = currentData;

      // delete task in column
      const tasks = {
        ...board.tasks,
        [columnId]: board.tasks[columnId].filter((task) => task.id !== taskId),
      };

      return { ...currentData, board: { ...board, tasks } };
    },
    false
  );
}
