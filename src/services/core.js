import axios from 'axios';

const defaultInstance = axios.create({
  baseURL: process.env.API_URL,
  responseType: 'json',
  headers: {
    Accept: 'application/json',
  },
});

// response interceptor
defaultInstance.interceptors.response.use(response => {
  return response?.data?.data || response;
});

class CoreService {
  instance = defaultInstance;

  onRequestError = cb => {
    typeof cb === 'function'
      ? (this.handleRequestError = cb)
      : (this.handleRequestError = () => {});
  };
  onStatus401 = cb => {
    typeof cb === 'function'
      ? (this.handleStatus401 = cb)
      : (this.handleStatus401 = () => {});
  };

  // token setter to update axios instance's Bearer header
  setToken = token => {
    if (!token) {
      this.instance.defaults.headers.Authorization = undefined;
      return;
    }
    this.instance.defaults.headers.Authorization = `Bearer ${token}`;
  };

  login = data => this.instance.post('/login', data);
  logout = () => this.instance.delete('/logout');

  // EVENT
  fetchEvent = code => this.instance.get(`/topic/${code}`);
  fetchMyEvent = code => this.instance.get(`/event/${code}/my_event`);

  // TOPIC
  fetchMyTopic = code => this.instance.get(`/topic/${code}/get_my_topic`);
  createTopic = (id, data) =>
    this.instance.post(`/event/${id}/topic`, { topic: data });
  activeTopic = id => this.instance.post(`/topic/${id}/active`);
  deactiveTopic = id => this.instance.post(`/topic/${id}/deactive`);

  // QUESTION
  createQuestion = (id, description) =>
    this.instance.post(`/topic/${id}/question`, { question: { description } });
  voteQuestion = (topicId, questionId) =>
    this.instance.post(
      `/topic/${topicId}/question/${questionId}/question_vote`,
    );
  unvoteQuestion = (topicId, questionId) =>
    this.instance.post(
      `/topic/${topicId}/question/${questionId}/question_unvote`,
    );
  removeQuestion = (topicId, questionId) =>
    this.instance.delete(`/topic/${topicId}/question/${questionId}`);
  markAnsweredQuestion = (topicId, questionId) =>
    this.instance.post(
      `/topic/${topicId}/question/${questionId}/mark_answered`,
    );
  unmarkAnsweredQuestion = (topicId, questionId) =>
    this.instance.post(
      `/topic/${topicId}/question/${questionId}/unmark_answered`,
    );
}

export default CoreService;

export const client = new CoreService();
