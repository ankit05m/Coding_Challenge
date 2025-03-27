export type Task = {
  name: string;
  complete: boolean;
  description: string;
};

export type TaskAndId = Task & { _id: string };
