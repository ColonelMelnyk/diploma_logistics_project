export const selectUserKey = (state) => state.auth?.user?.email || null;

export const selectRefillHistory = (state) => {
  const userKey = selectUserKey(state);
  if (!userKey) return [];
  return state.logisticsHistory?.byUser?.[userKey]?.history ?? [];
};

export default selectRefillHistory;
