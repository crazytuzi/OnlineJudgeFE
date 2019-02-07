import * as types from './mutation-types';
// 提交mutation
function makeAction (type) {
  return ({ commit }, ...args) => commit(type, ...args);
}

export const setInfo = makeAction(types.SET_INFO);
export const setAcceptedProblems = makeAction(types.SET_ACCEPTEDPROBLEMS);
export const setChallengingProblems = makeAction(types.SET_CHALLENGINGPROBLEMS);
export const setCollections = makeAction(types.SET_COLLECTIONS);
export const setNav = makeAction(types.SET_NAV);

export const setShopList = makeAction(types.SET_SHOPLIST);
// export const getPermit = makeAction(types.GET_PERMIT);
// export const getNavInfo = makeAction(types.GET_NAV);
