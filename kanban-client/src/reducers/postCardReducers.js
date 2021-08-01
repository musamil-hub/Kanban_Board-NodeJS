import { ACTION_TYPES } from '../actions/postCardAction';
//
const Dummy = {
  todo: {
    title: 'Todo',
    items: [],
  },
  doing: {
    title: 'Doing',
    items: [],
  },
  done: {
    title: 'Done',
    items: [],
  },
};
let todoarr = [];
let doingarr = [];
let donearr = [];

export const postCard = (state = Dummy, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_ALL:
      todoarr = [];
      doingarr = [];
      donearr = [];
      for (let i in action.payload) {
        const _id = action.payload[i]._id;
        const title = action.payload[i].title;
        const description = action.payload[i].description;
        const assign_to = action.payload[i].assign_to;
        const date = action.payload[i].date;
        const color = action.payload[i].color;
        const data = {
          _id,
          title,
          description,
          assign_to,
          date,
          color,
        };
        if (assign_to === 'todo') {
          todoarr.push(data);
        } else if (assign_to === 'doing') {
          doingarr.push(data);
        } else {
          donearr.push(data);
        }
      }
      return {
        todo: {
          title: 'Todo',
          ...state.todo,
          items: todoarr,
        },
        doing: {
          title: 'Doing',
          ...state.doing,
          items: doingarr,
        },
        done: {
          title: 'Done',
          ...state.done,
          items: donearr,
        },
      };
    case ACTION_TYPES.CREATE:
      const cassign_to = action.payload.assign_to;
      const newdata = {
        ...action.payload,
      };
      if (cassign_to === 'todo') {
        todoarr.push(newdata);
      } else if (cassign_to === 'doing') {
        doingarr.push(newdata);
      } else {
        donearr.push(newdata);
      }

      return {
        todo: {
          title: 'Todo',
          ...state.todo,
          items: [...todoarr],
        },
        doing: {
          title: 'Doing',
          ...state.doing,
          items: [...doingarr],
        },
        done: {
          title: 'Done',
          ...state.done,
          items: [...donearr],
        },
      };
    case ACTION_TYPES.UPDATE:
      let updatearr = [];
      updatearr.push(...todoarr, ...doingarr, ...donearr);
      const updatedata = {
        ...action.payload,
      };

      updatearr = updatearr.map(x => {
        return x._id === action.payload._id ? updatedata : x;
      });

      todoarr = [];
      doingarr = [];
      donearr = [];
      for (let j in updatearr) {
        const u_id = updatearr[j]._id;
        const utitle = updatearr[j].title;
        const udescription = updatearr[j].description;
        const uassign_to = updatearr[j].assign_to;
        const udate = updatearr[j].date;
        const ucolor = updatearr[j].color;
        const updatedata = {
          _id: u_id,
          title: utitle,
          description: udescription,
          assign_to: uassign_to,
          date: udate,
          color: ucolor,
        };
        if (uassign_to === 'todo') {
          todoarr.push(updatedata);
        } else if (uassign_to === 'doing') {
          doingarr.push(updatedata);
        } else {
          donearr.push(updatedata);
        }
      }
      return {
        todo: {
          title: 'Todo',
          ...state.todo,
          items: todoarr,
        },
        doing: {
          title: 'Doing',
          ...state.doing,
          items: doingarr,
        },
        done: {
          title: 'Done',
          ...state.done,
          items: donearr,
        },
      };
    case ACTION_TYPES.DND:
      let dndarr = [];
      dndarr.push(...todoarr, ...doingarr, ...donearr);
      const dnddata = {
        ...action.payload,
      };

      dndarr = dndarr.map(x => {
        return x._id === action.payload._id ? dnddata : x;
      });

      todoarr = [];
      doingarr = [];
      donearr = [];
      for (let j in dndarr) {
        const dnd_id = dndarr[j]._id;
        const dnd_title = dndarr[j].title;
        const dnd_description = dndarr[j].description;
        const dnd_assign_to = dndarr[j].assign_to;
        const dnd_date = dndarr[j].date;
        const dnd_color = dndarr[j].color;
        const dnddata = {
          _id: dnd_id,
          title: dnd_title,
          description: dnd_description,
          assign_to: dnd_assign_to,
          date: dnd_date,
          color: dnd_color,
        };
        if (dnd_assign_to === 'todo') {
          todoarr.push(dnddata);
        } else if (dnd_assign_to === 'doing') {
          doingarr.push(dnddata);
        } else {
          donearr.push(dnddata);
        }
      }
      return {
        todo: {
          title: 'Todo',
          ...state.todo,
          items: todoarr,
        },
        doing: {
          title: 'Doing',
          ...state.doing,
          items: doingarr,
        },
        done: {
          title: 'Done',
          ...state.done,
          items: donearr,
        },
      };
    case ACTION_TYPES.DELETE:
      todoarr = todoarr.filter(x => x._id !== action.payload);
      doingarr = doingarr.filter(x => x._id !== action.payload);
      donearr = donearr.filter(x => x._id !== action.payload);

      return {
        todo: {
          title: 'Todo',
          ...state.todo,
          items: todoarr,
        },
        doing: {
          title: 'Doing',
          ...state.doing,
          items: doingarr,
        },
        done: {
          title: 'Done',
          ...state.done,
          items: donearr,
        },
      };

    default:
      return state;
  }
};
