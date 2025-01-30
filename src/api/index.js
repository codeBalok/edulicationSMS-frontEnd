import axios from 'axios';
// import { showToast } from '../utils/toastUtils';
import { showToast } from '../utils/toastUtils';

const http = axios.create({
  'baseURL': 'http://127.0.0.1:8000/api',
  'headers': {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
   },
});

http.interceptors.response.use(
  response => response,
  error => {
    const defaultMessage = 'An unexpected error occurred. Please try again.';
    let errorMessage = defaultMessage;

    if (error.response) {
      const { data, status } = error.response;
      
      errorMessage = data?.message ||
        data?.error?.message ||
        data?.errors?.[0]?.message ||
        data?.detail ||
        data?.title ||
        defaultMessage;
      if (status >= 500) {
        errorMessage = 'Server error. Please try again later.';
      }
    } else if (error.request) {
      // The request was made but no response received
      errorMessage = 'Network error. Please check your internet connection.';
    }

    showToast('error', 'Error', errorMessage);
    return Promise.reject(error);
  }
);

const api = {
    //Hierarchy 
    fetchHierarchy : (id) => http.get(`hierarchies/${id}`),
    createHierarchy : (id, data) => http.post(`hierarchies/${id}`, data),

    // Faculty APi
    fetchFacultiesParent : () => http.get('faculties/list'),
    createFaculties : (data) => http.post('faculties', data),
    fetchFacultiesLists: () => http.get('faculties'),

    // Program APi
    fetchProgramParent : () => http.get('programs/list'),
    createProgram : (data) => http.post('programs', data),
    fetchProgramLists: () => http.get('programs'),

    // Departments APi
    fetchDepartmentsParent : () => http.get('departments/list'),
    createDepartment : (data) => http.post('departments', data),
    fetchDepartment: () => http.get('departments'),

    // Course APi
    fetchCourseParent : () => http.get('courses/list'),
    createCourse : (data) => http.post('courses', data),
    fetchCourse: () => http.get('courses'),

    // Batch APi
    fetchBatchParent : () => http.get('batches/list'),
    createBatch : (data) => http.post('batches', data),
    fetchBatch: () => http.get('batches'),

    // Session APi
    fetchSessionParent : () => http.get('sessions/list'),
    createSession : (data) => http.post('sessions', data),
    fetchSession: () => http.get('sessions'),

    // Semesters APi
    fetchSemesterParent : () => http.get('semesters/list'),
    createSemester : (data) => http.post('semesters', data),
    fetchSemester: () => http.get('semesters'),

    // Section APi
    fetchSectionParent : () => http.get('sections/list'),
    createSection : (data) => http.post('sections', data),
    fetchSection: () => http.get('sections'),

    // ClassRoom APi
    fetchClassRoomParent : () => http.get('class-rooms/list'),
    createClassRoom : (data) => http.post('class-rooms', data),
    fetchClassRoom: () => http.get('class-rooms'),

    // ClassYear APi
    fetchClassYearParent : () => http.get('class-year/list'),
    createClassYear : (data) => http.post('class-year', data),
    fetchClassYear: () => http.get('class-year'),

    // Subject APi
    fetchSubjectParent : () => http.get('subjects/list'),
    createSubject : (data) => http.post('subjects', data),
    fetchSubject: () => http.get('subjects'),

    // Module APi
    fetchModuleParent : () => http.get('modules/list'),
    createModule : (data) => http.post('modules', data),
    fetchModule: () => http.get('modules'),

    // Unit APi
    fetchUnitParent : () => http.get('units/list'),
    createUnit : (data) => http.post('units', data),
    fetchUnit: () => http.get('units'),

    // Assessment APi
    fetchAssessmentParent : () => http.get('assessment/list'),
    createAssessment : (data) => http.post('assessment', data),
    fetchAssessment: () => http.get('assessment'),

    // Grading APi
    fetchGradingParent : () => http.get('gradings/list'),
    createGrading : (data) => http.post('gradings', data),
    fetchGrading: () => http.get('gradings'),

    // Curriculum APi
    fetchCurriculumParent : () => http.get('curriculums/list'),
    createCurriculum : (data) => http.post('curriculums', data),
    fetchCurriculum: () => http.get('curriculums'),

    // LearningOutcome APi
    fetchLearningOutcomeParent : () => http.get('learning-outcomes/list'),
    createLearningOutcome : (data) => http.post('learning-outcomes', data),
    fetchLearningOutcome: () => http.get('learning-outcomes'),

    // AcademicCalendar APi
    fetchAcademicCalendarParent : () => http.get('academic-calendars/list'),
    createAcademicCalendar : (data) => http.post('academic-calendars', data),
    fetchAcademicCalendar: () => http.get('academic-calendars'),

    // Event APi
    fetchEventParent : () => http.get('events/list'),
    createEvent : (data) => http.post('events', data),
    fetchEvent: () => http.get('events'),

    //Custom Fields

    fetchCustomField: (data) => http.get('custom-field', {
        params: {
            type: data
        }
    }),
    createCustomField: (data) => http.post('custom-field',data),
};

export default api;

