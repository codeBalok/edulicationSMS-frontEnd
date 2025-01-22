import axios from 'axios';

const api = {
    // Institute API
    fetchInstitutes: () => axios.get('http://127.0.0.1:8000/api/institutes'),
    createInstitute: (data) => axios.post('http://127.0.0.1:8000/api/institutes', data),
    fetchInstitute: (id) => axios.get(`http://127.0.0.1:8000/api/institutes/${id}`),
    updateInstitute: (id, data) => axios.put(`http://127.0.0.1:8000/api/institutes/${id}`, data),
    deleteInstitute: (id) => axios.delete(`http://127.0.0.1:8000/api/institutes/${id}`),
    saveHierarchy: (id, data) => axios.post(`http://127.0.0.1:8000/api/hierarchies/${id}/`, data),
    fetchHierarchy: (id) => axios.get(`http://127.0.0.1:8000/api/hierarchies/${id}`),
    fetchAcademicItems: (id) => axios.get(`http://127.0.0.1:8000/api/institutes/${id}/academic-items`),

    // Custom Fieldhttp://127.0.0.1:8000 API
    fetchCustomFields: () => axios.get('http://127.0.0.1:8000/api/custom-fields'),
    createCustomField: (id, data) => axios.post(`http://127.0.0.1:8000/api/create-custom-fields/${id}`, data),
    fetchCustomField: (id) => axios.get(`http://127.0.0.1:8000/api/custom-fields/${id}`),
    updateCustomField: (id, data) => axios.put(`http://127.0.0.1:8000/api/custom-fields/${id}`, data),
    deleteCustomField: (id) => axios.delete(`http://127.0.0.1:8000/api/custom-fields/${id}`),
    fetchCustomFieldValues: (academicItem) => axios.get(`http://127.0.0.1:8000/api/custom-fields/${academicItem}/values`),
    saveCustomFieldValues: (academicItem, data) => axios.post(`http://127.0.0.1:8000/api/custom-fields/${academicItem}/values`, data),

    // Default Fieldhttp://127.0.0.1:8000 API (New)
    fetchPrograms: (instituteId) => axios.get(`http://127.0.0.1:8000/api/institutes/${instituteId}/programs`),
    createProgram: (instituteId, data) => axios.post(`http://127.0.0.1:8000/api/institutes/${instituteId}/programs`, data),
    fetchProgram: (instituteId, id) => axios.get(`http://127.0.0.1:8000/api/institutes/${instituteId}/programs/${id}`),
    updateProgram: (instituteId, id, data) => axios.put(`http://127.0.0.1:8000/api/institutes/${instituteId}/programs/${id}`, data),
    deleteProgram: (instituteId, id) => axios.delete(`http://127.0.0.1:8000/api/institutes/${instituteId}/programs/${id}`),

    fetchCourses: (instituteId) => axios.get(`http://127.0.0.1:8000/api/institutes/${instituteId}/courses`),
    createCourse: (instituteId, data) => axios.post(`http://127.0.0.1:8000/api/institutes/${instituteId}/courses`, data),
    fetchCourse: (instituteId, id) => axios.get(`http://127.0.0.1:8000/api/institutes/${instituteId}/courses/${id}`),
    updateCourse: (instituteId, id, data) => axios.put(`http://127.0.0.1:8000/api/institutes/${instituteId}/courses/${id}`, data),
    deleteCourse: (instituteId, id) => axios.delete(`http://127.0.0.1:8000/api/institutes/${instituteId}/courses/${id}`),

    fetchAssessments: (instituteId) => axios.get(`http://127.0.0.1:8000/api/institutes/${instituteId}/assessments`),
    createAssessment: (instituteId, data) => axios.post(`http://127.0.0.1:8000/api/institutes/${instituteId}/assessments`, data),
    fetchAssessment: (instituteId, id) => axios.get(`http://127.0.0.1:8000/api/institutes/${instituteId}/assessments/${id}`),
    updateAssessment: (instituteId, id, data) => axios.put(`http://127.0.0.1:8000/api/institutes/${instituteId}/assessments/${id}`, data),
    deleteAssessment: (instituteId, id) => axios.delete(`http://127.0.0.1:8000/api/institutes/${instituteId}/assessments/${id}`),

    fetchBatches: (instituteId) => axios.get(`http://127.0.0.1:8000/api/institutes/${instituteId}/batches`),
    createBatch: (instituteId, data) => axios.post(`http://127.0.0.1:8000/api/institutes/${instituteId}/batches`, data),
    fetchBatch: (instituteId, id) => axios.get(`http://127.0.0.1:8000/api/institutes/${instituteId}/batches/${id}`),
    updateBatch: (instituteId, id, data) => axios.put(`http://127.0.0.1:8000/api/institutes/${instituteId}/batches/${id}`, data),
    deleteBatch: (instituteId, id) => axios.delete(`http://127.0.0.1:8000/api/institutes/${instituteId}/batches/${id}`),

    fetchSemesters: (instituteId) => axios.get(`http://127.0.0.1:8000/api/institutes/${instituteId}/semesters`),
    createSemester: (instituteId, data) => axios.post(`http://127.0.0.1:8000/api/institutes/${instituteId}/semesters`, data),
    fetchSemester: (instituteId, id) => axios.get(`http://127.0.0.1:8000/api/institutes/${instituteId}/semesters/${id}`),
    updateSemester: (instituteId, id, data) => axios.put(`http://127.0.0.1:8000/api/institutes/${instituteId}/semesters/${id}`, data),
    deleteSemester: (instituteId, id) => axios.delete(`http://127.0.0.1:8000/api/institutes/${instituteId}/semesters/${id}`),

    fetchUnits: (instituteId) => axios.get(`http://127.0.0.1:8000/api/institutes/${instituteId}/units`),
    createUnit: (instituteId, data) => axios.post(`http://127.0.0.1:8000/api/institutes/${instituteId}/units`, data),
    fetchUnit: (instituteId, id) => axios.get(`http://127.0.0.1:8000/api/institutes/${instituteId}/units/${id}`),
    updateUnit: (instituteId, id, data) => axios.put(`http://127.0.0.1:8000/api/institutes/${instituteId}/units/${id}`, data),
    deleteUnit: (instituteId, id) => axios.delete(`http://127.0.0.1:8000/api/institutes/${instituteId}/units/${id}`),

    fetchModules: (instituteId) => axios.get(`http://127.0.0.1:8000/api/institutes/${instituteId}/modules`),
    createModule: (instituteId, data) => axios.post(`http://127.0.0.1:8000/api/institutes/${instituteId}/modules`, data),
    fetchModule: (instituteId, id) => axios.get(`http://127.0.0.1:8000/api/institutes/${instituteId}/modules/${id}`),
    updateModule: (instituteId, id, data) => axios.put(`http://127.0.0.1:8000/api/institutes/${instituteId}/modules/${id}`, data),
    deleteModule: (instituteId, id) => axios.delete(`http://127.0.0.1:8000/api/institutes/${instituteId}/modules/${id}`),

    fetchGradings: (instituteId) => axios.get(`http://127.0.0.1:8000/api/institutes/${instituteId}/gradings`),
    createGrading: (instituteId, data) => axios.post(`http://127.0.0.1:8000/api/institutes/${instituteId}/gradings`, data),
    fetchGrading: (instituteId, id) => axios.get(`http://127.0.0.1:8000/api/institutes/${instituteId}/gradings/${id}`),
    updateGrading: (instituteId, id, data) => axios.put(`http://127.0.0.1:8000/api/institutes/${instituteId}/gradings/${id}`, data),
    deleteGrading: (instituteId, id) => axios.delete(`http://127.0.0.1:8000/api/institutes/${instituteId}/gradings/${id}`),

    fetchDepartments: (instituteId) => axios.get(`http://127.0.0.1:8000/api/institutes/${instituteId}/departments`),
    createDepartment: (instituteId, data) => axios.post(`http://127.0.0.1:8000/api/institutes/${instituteId}/departments`, data),
    fetchDepartment: (instituteId, id) => axios.get(`http://127.0.0.1:8000/api/institutes/${instituteId}/departments/${id}`),
    updateDepartment: (instituteId, id, data) => axios.put(`http://127.0.0.1:8000/api/institutes/${instituteId}/departments/${id}`, data),
    deleteDepartment: (instituteId, id) => axios.delete(`http://127.0.0.1:8000/api/institutes/${instituteId}/departments/${id}`),

    fetchFaculties: (instituteId) => axios.get(`http://127.0.0.1:8000/api/institutes/${instituteId}/faculties`),
    createFaculty: (instituteId, data) => axios.post(`http://127.0.0.1:8000/api/institutes/${instituteId}/faculties`, data),
    fetchFaculty: (instituteId, id) => axios.get(`http://127.0.0.1:8000/api/institutes/${instituteId}/faculties/${id}`),
    updateFaculty: (instituteId, id, data) => axios.put(`http://127.0.0.1:8000/api/institutes/${instituteId}/faculties/${id}`, data),
    deleteFaculty: (instituteId, id) => axios.delete(`http://127.0.0.1:8000/api/institutes/${instituteId}/faculties/${id}`),

    fetchSessions: (instituteId) => axios.get(`http://127.0.0.1:8000/api/institutes/${instituteId}/sessions`),
    createSession: (instituteId, data) => axios.post(`http://127.0.0.1:8000/api/institutes/${instituteId}/sessions`, data),
    fetchSession: (instituteId, id) => axios.get(`http://127.0.0.1:8000/api/institutes/${instituteId}/sessions/${id}`),
    updateSession: (instituteId, id, data) => axios.put(`http://127.0.0.1:8000/api/institutes/${instituteId}/sessions/${id}`, data),
    deleteSession: (instituteId, id) => axios.delete(`http://127.0.0.1:8000/api/institutes/${instituteId}/sessions/${id}`),

    fetchSections: (instituteId) => axios.get(`http://127.0.0.1:8000/api/institutes/${instituteId}/sections`),
    createSection: (instituteId, data) => axios.post(`http://127.0.0.1:8000/api/institutes/${instituteId}/sections`, data),
    fetchSection: (instituteId, id) => axios.get(`http://127.0.0.1:8000/api/institutes/${instituteId}/sections/${id}`),
    updateSection: (instituteId, id, data) => axios.put(`http://127.0.0.1:8000/api/institutes/${instituteId}/sections/${id}`, data),
    deleteSection: (instituteId, id) => axios.delete(`http://127.0.0.1:8000/api/institutes/${instituteId}/sections/${id}`),

    fetchClassYears: (instituteId) => axios.get(`http://127.0.0.1:8000/api/institutes/${instituteId}/class-years`),
    createClassYear: (instituteId, data) => axios.post(`http://127.0.0.1:8000/api/institutes/${instituteId}/class-years`, data),
    fetchClassYear: (instituteId, id) => axios.get(`http://127.0.0.1:8000/api/institutes/${instituteId}/class-years/${id}`),
    updateClassYear: (instituteId, id, data) => axios.put(`http://127.0.0.1:8000/api/institutes/${instituteId}/class-years/${id}`, data),
    deleteClassYear: (instituteId, id) => axios.delete(`http://127.0.0.1:8000/api/institutes/${instituteId}/class-years/${id}`),

    fetchClassrooms: (instituteId) => axios.get(`http://127.0.0.1:8000/api/institutes/${instituteId}/classrooms`),
    createClassroom: (instituteId, data) => axios.post(`http://127.0.0.1:8000/api/institutes/${instituteId}/classrooms`, data),
    fetchClassroom: (instituteId, id) => axios.get(`http://127.0.0.1:8000/api/institutes/${instituteId}/classrooms/${id}`),
    updateClassroom: (instituteId, id, data) => axios.put(`http://127.0.0.1:8000/api/institutes/${instituteId}/classrooms/${id}`, data),
    deleteClassroom: (instituteId, id) => axios.delete(`http://127.0.0.1:8000/api/institutes/${instituteId}/classrooms/${id}`),

    fetchSubjects: (instituteId) => axios.get(`http://127.0.0.1:8000/api/institutes/${instituteId}/subjects`),
    createSubject: (instituteId, data) => axios.post(`http://127.0.0.1:8000/api/institutes/${instituteId}/subjects`, data),
    fetchSubject: (instituteId, id) => axios.get(`http://127.0.0.1:8000/api/institutes/${instituteId}/subjects/${id}`),
    updateSubject: (instituteId, id, data) => axios.put(`http://127.0.0.1:8000/api/institutes/${instituteId}/subjects/${id}`, data),
    deleteSubject: (instituteId, id) => axios.delete(`http://127.0.0.1:8000/api/institutes/${instituteId}/subjects/${id}`),

    fetchCurriculums: (instituteId) => axios.get(`http://127.0.0.1:8000/api/institutes/${instituteId}/curriculums`),
    createCurriculum: (instituteId, data) => axios.post(`http://127.0.0.1:8000/api/institutes/${instituteId}/curriculums`, data),
    fetchCurriculum: (instituteId, id) => axios.get(`http://127.0.0.1:8000/api/institutes/${instituteId}/curriculums/${id}`),
    updateCurriculum: (instituteId, id, data) => axios.put(`http://127.0.0.1:8000/api/institutes/${instituteId}/curriculums/${id}`, data),
    deleteCurriculum: (instituteId, id) => axios.delete(`http://127.0.0.1:8000/api/institutes/${instituteId}/curriculums/${id}`),

    fetchLearningOutcomes: (instituteId) => axios.get(`http://127.0.0.1:8000/api/institutes/${instituteId}/learning-outcomes`),
    createLearningOutcome: (instituteId, data) => axios.post(`http://127.0.0.1:8000/api/institutes/${instituteId}/learning-outcomes`, data),
    fetchLearningOutcome: (instituteId, id) => axios.get(`http://127.0.0.1:8000/api/institutes/${instituteId}/learning-outcomes/${id}`),
    updateLearningOutcome: (instituteId, id, data) => axios.put(`http://127.0.0.1:8000/api/institutes/${instituteId}/learning-outcomes/${id}`, data),
    deleteLearningOutcome: (instituteId, id) => axios.delete(`http://127.0.0.1:8000/api/institutes/${instituteId}/learning-outcomes/${id}`),

    fetchAcademicCalendars: (instituteId) => axios.get(`http://127.0.0.1:8000/api/institutes/${instituteId}/academic-calendars`),
    createAcademicCalendar: (instituteId, data) => axios.post(`http://127.0.0.1:8000/api/institutes/${instituteId}/academic-calendars`, data),
    fetchAcademicCalendar: (instituteId, id) => axios.get(`http://127.0.0.1:8000/api/institutes/${instituteId}/academic-calendars/${id}`),
    updateAcademicCalendar: (instituteId, id, data) => axios.put(`http://127.0.0.1:8000/api/institutes/${instituteId}/academic-calendars/${id}`, data),
    deleteAcademicCalendar: (instituteId, id) => axios.delete(`http://127.0.0.1:8000/api/institutes/${instituteId}/academic-calendars/${id}`),

    fetchEvents: (instituteId) => axios.get(`http://127.0.0.1:8000/api/institutes/${instituteId}/events`),
    createEvent: (instituteId, data) => axios.post(`http://127.0.0.1:8000/api/institutes/${instituteId}/events`, data),
    fetchEvent: (instituteId, id) => axios.get(`http://127.0.0.1:8000/api/institutes/${instituteId}/events/${id}`),
    updateEvent: (instituteId, id, data) => axios.put(`http://127.0.0.1:8000/api/institutes/${instituteId}/events/${id}`, data),
    deleteEvent: (instituteId, id) => axios.delete(`http://127.0.0.1:8000/api/institutes/${instituteId}/events/${id}`),
};

export default api;

