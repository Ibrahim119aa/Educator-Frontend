/* eslint-disable @typescript-eslint/no-explicit-any */
import { TeachingLocation, Ward } from "@/types/teacher";
import { fetchApi } from "./API";

export const fetchTeachers = async () => {
    return await fetchApi('/teacher', 'GET');
}

export const getAllTeachers = async (filter="") => {
    // send filter to query params
    return await fetchApi(`/teacher/all${filter}`, 'GET');
}

export const getTeacher = async (id:any) => {
    return await fetchApi(`/teacher/${id}`, 'GET');
}

export const registerTeacher = async (data:any) => {
    return await fetchApi(`/teacher`, 'POST', data);
}

export const loginTeacher = async (data:any) => {
    return await fetchApi(`/teacher/login`, 'POST', data);
}

export const logoutTeacher = async () => {
    return await fetchApi(`/teacher/logout`, 'POST');
}

export const teacherProfile = async () => {
    return await fetchApi(`/teacher/profile`, 'GET');
}

export const teacherDocuments = async () => {
    return await fetchApi(`/teacher/documents`, 'GET');
}

export const updateTeacherProfile = async (data:any) => {
    return await fetchApi(`/teacher/update`, 'PUT', data);
}

export const addTeacherResidentialAddress = async (data:any) => {
    return await fetchApi(`/teacher/add-residential-address`, 'POST', data);
}

export const updateTeacherResidentialAddress = async (data:any) => {
    return await fetchApi(`/teacher/update-residential-address`, 'PUT', data);
}

export const updateTeacherPermanentAddress = async (data:any) => {
    return await fetchApi(`/teacher/update-permanent-address`, 'PUT', data);
}

export const addNewTeachingLocation = async (data:any) => {
    return await fetchApi(`/teacher/add-new-teaching-location`, 'POST', data);
}

export const getTeachingLocations = async () => {
    return await fetchApi(`/teacher/get-teaching-locations`, 'GET');
}

export const deleteTeachingLocation = async (id:any) => {
    return await fetchApi(`/teacher/teaching-location/${id}`, 'DELETE');
}

export const changeTeacherProfilePic = async (data:any) => {
    return await fetchApi('/teacher/update-profile-pic', 'POST', data);
}

export const uploadDocument = async (data:any) => {
    return await fetchApi('/teacher/upload-document', 'POST', data);
}

export const initiatePaymentForTeacherVerification = async () => {
    return await fetchApi('/payment/teacher/create-an-order', 'GET');
}

export const checkForAccountVerification = async () => {
    return await fetchApi('/teacher/check-for-account-verification', 'GET');
}

export const verifyTeacherPayment = async (data:any) => {
    return await fetchApi('/payment/teacher/verify-payment', 'POST', data);
}

export const verifyTeacher = async (id:any) => {
    return await fetchApi(`/teacher/verify/${id}`, 'PUT');
}

export const getTeacherSubjects = async () => {
    return await fetchApi('/teacher/subjects', 'GET');
}

export const getSubjectList = async () => {
    return await fetchApi('/teacher/subject-list', 'GET');
}

export const getClassList = async () => {
    return await fetchApi('/teacher/class-list', 'GET');
}

export const getTeachingLocationList = async () => {
    return await fetchApi<TeachingLocation[]>('/teacher/teaching-location-list', 'GET');
}

export const getTeachingLocationWardsList = async (id:string) => {
    return await fetchApi<Ward[]>(`/teacher/teaching-location-list/${id}/ward`, 'GET');
}

export const addTeacherSubject = async (data:any) => {
    return await fetchApi('/teacher/add-subject', 'POST', data);
}

export const deleteTeacherSubject = async (id:any) => {
    return await fetchApi(`/teacher/subject/${id}`, 'DELETE');
}

