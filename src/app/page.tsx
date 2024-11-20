"use client";
import React, { useState, useEffect } from 'react';

type Task = {
  title: string;
  desc: string;
};

const Page = () => {
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [mainTask, setMainTask] = useState<Task[]>([]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setMainTask([...mainTask, { title, desc }]);
    setTitle("");
    setDesc("");
  };

  const deleteHandler = (i: number) => {
    const copyTask = [...mainTask];
    copyTask.splice(i, 1);
    setMainTask(copyTask);
  };

  // Using useEffect to log mainTask after it changes
  useEffect(() => {
    if (mainTask.length > 0) {
      console.log(mainTask);
    }
  }, [mainTask]);

  // Define renderTask as JSX.Element | JSX.Element[] to ensure it's an array of elements
  let renderTask: JSX.Element | JSX.Element[] = [];

  if (mainTask.length === 0) {
    renderTask = <h2 key="no-tasks">No Task Available</h2>;
  } else {
    renderTask = mainTask.map((t, i) => (
      <li key={i} className='flex items-center justify-between mb-8'>
        <div className='flex items-center justify-between w-2/3'>
          <h5 className="text-2xl font-semibold">{t.title}</h5>
          <h6 className='text-lg font-medium'>{t.desc}</h6>
        </div>
        <button
          onClick={() => deleteHandler(i)}
          className='bg-red-400 text-white px-4 py-2 rounded font-bold'
        >
          Delete
        </button>
      </li>
    ));
  }

  return (
    <div>
      <h1 className='bg-black text-white p-5 text-5xl font-bold text-center'>My Todo List</h1>
      <form onSubmit={submitHandler}>
        <input
          type='text'
          className='text-2xl border-zinc-800 border-4 m-8 px-4 py-2'
          placeholder='Enter Task here'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type='text'
          className='text-2xl border-zinc-800 border-4 m-8 px-4 py-2'
          placeholder='Enter Description here'
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button className='bg-black text-white px-4 py-3 text-2xl font-bold rounded m-5'>Add Task</button>
      </form>

      <hr />
      <div className='p-8 bg-slate-200'>
        <ul>{renderTask}</ul>
      </div>
    </div>
  );
};

export default Page;
