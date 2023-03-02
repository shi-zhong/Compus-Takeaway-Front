import { Code } from '@/code/code';

interface res {
  code: number;
  data: any;
  msg: string;
}

const Execute = (
  res: res,
  runner: {
    condition: number[];
    run: () => void;
  }[],
) => {
  for (let runs of runner) {
    if (runs.condition.indexOf(res.code) != -1) runs.run();
    return;
  }
};

export const Res = (
  res: res,
  execute: {
    OK: () => void;
    UnAuthorized?:() => void;
    ServerError?: () => void;
  },
) => {

  Execute(res, [
    {
      condition: [Code.OK],
      run: execute.OK,
    },
    {
      condition: [Code.UnAuthorized],
      run: execute?.UnAuthorized || (() => {})
    },
    {
      condition: [
        Code.ServerError,
        Code.InsertError,
        Code.DropError,
        Code.CheckError,
        Code.UpdateError,
      ],
      run: () => {
        alert('服务器错误');
        execute?.ServerError && execute?.ServerError();
      },
    },
  ]);
};
