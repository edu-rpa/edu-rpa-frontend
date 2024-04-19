import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Notification } from '@/interfaces/notification';
import notificationApi, { NOTI_PAGE_LIMIT } from '@/apis/notificationApi';

interface NotificationState {
  isLoading: boolean;
  notifications: Notification[];
  hasMore: boolean;
  countUnread: number;
  curPage: number;
}

const initialState: NotificationState = {
  isLoading: false,
  notifications: [],
  hasMore: true,
  countUnread: 0,
  curPage: 1,
};

export const refetchNotifications = createAsyncThunk(
  'notification/fetchNotifications',
  async (thunkAPI) => {
    const [notifications, countUnread] = await Promise.all([
      notificationApi.getNotifications(1),
      notificationApi.getCountUnread(),
    ]);
    return { notifications, countUnread };
  }
);

export const fetchMoreNotifications = createAsyncThunk(
  'notification/fetchMoreNotifications',
  async (pageNumer: number, thunkAPI) => {
    return await notificationApi.getNotifications(pageNumer);
  }
);

export const markAsRead = createAsyncThunk(
  'notification/markAsRead',
  async (id: number, thunkAPI) => {
    await notificationApi.markAsRead(id);
    return id;
  }
);

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.notifications = action.payload;
    },

    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },

    setCountUnread: (state, action: PayloadAction<number>) => {
      state.countUnread = action.payload;
    },

    setCurPage: (state, action: PayloadAction<number>) => {
      state.curPage = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(refetchNotifications.pending, (state) => {
      state.isLoading = true;
      state.hasMore = true;
      state.curPage = 1;
    });

    builder.addCase(refetchNotifications.fulfilled, (state, action) => {
      state.notifications = action.payload.notifications;
      if (action.payload.notifications.length < NOTI_PAGE_LIMIT) {
        state.hasMore = false;
      }
      state.countUnread = action.payload.countUnread;
      state.isLoading = false;
    });

    builder.addCase(fetchMoreNotifications.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchMoreNotifications.fulfilled, (state, action) => {
      state.notifications = [...state.notifications, ...action.payload];
      if (action.payload.length < NOTI_PAGE_LIMIT) {
        state.hasMore = false;
      }
      state.curPage++;
      state.isLoading = false;
    });

    builder.addCase(markAsRead.fulfilled, (state, action) => {
      state.notifications = state.notifications.map((noti) => {
        if (noti.id === action.payload) {
          return { ...noti, isRead: true };
        }
        return noti;
      });
      state.countUnread--;
    });
  },
});

export const {
  setIsLoading,
  setNotifications,
  setHasMore,
  setCountUnread,
  setCurPage,
} = notificationSlice.actions;

export default notificationSlice;
