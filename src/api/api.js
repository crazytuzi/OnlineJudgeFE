import axios from 'axios';
import cookie from '../static/js/cookie'

let host = '/api';

//获取题目列表
export const getProblems = params => { return axios.get(`${host}/problems/`,{ params: params  })};

//获取题目信息
export const getProblemDetail = problemId => { return axios.get(`${host}/problems/${problemId}`+'/')};

//获取提交列表
export const getSubmissions = params => { return axios.get(`${host}/submissions/`,{ params: params  })};

//获取提交信息
export const getSubmissionDetail = submissionId => { return axios.get(`${host}/submissions/${submissionId}`+'/')};

// 添加提交记录
export const addSubmission = params => { return axios.post(`${host}/submissions/`,params,{
  headers:{'X-CSRFToken': cookie.getCookie('csrftoken')}
})};

//获取Accept列表
export const getAcceptedProblems = params => { return axios.get(`${host}/useracceptedproblems/`,{ params: params  })};

//获取Challenge列表
export const getChallengingProblems = params => { return axios.get(`${host}/userchallengingproblems/`,{ params: params  })};

//获取收藏列表
export const getCollections = params => { return axios.get(`${host}/usercollect/`,{ params: params  })};

// 添加收藏
export const addCollection = params => { return axios.post(`${host}/usercollect/`,params,{
  headers:{'X-CSRFToken': cookie.getCookie('csrftoken')}
})};

//取消收藏
export const delCollection = collectionId => {return axios.delete(`${host}/usercollect/`+collectionId+'/')};

//获取比赛列表
export const getContests = params => { return axios.get(`${host}/contests/`,{ params: params  })};

//获取比赛排名列表
export const getContestRankList = params => { return axios.get(`${host}/contestrank/`,{ params: params  })};

//获取比赛信息
export const getContestDetail = contestId => { return axios.get(`${host}/contests/${contestId}`+'/')};

//获取排名列表
export const getRanks = params => { return axios.get(`${host}/userprofile/`,{ params: params  })};


//登录
export const login = params => {
  return axios.post(`${host}/login/`, params)
};
//注册
export const register = params => {
  return axios.post(`${host}/register/`, params)
};


export const getUser = params => {
  return axios.get(`${host}/users/`, { params: params })
};

//上传头像
export const uploadAvatar = (userId, params) => {return axios.patch(`${host}/userprofile/`+userId+'/', params,{
  headers:{'Content-Type':'multipart/form-data','X-CSRFToken': cookie.getCookie('csrftoken')}
})};

//更新个人信息
export const updateUserProfile = (userId, params) => {return axios.patch(`${host}/userprofile/`+userId+'/', params,{
  headers:{'X-CSRFToken': cookie.getCookie('csrftoken')}
})};

//获取公告
export const getAnnouncementsList = params => { return axios.get(`${host}/announcements/`,{ params: params  })};

//获取公告信息
export const getAnnouncementDetail = announcementId => { return axios.get(`${host}/announcements/${announcementId}`+'/')};
