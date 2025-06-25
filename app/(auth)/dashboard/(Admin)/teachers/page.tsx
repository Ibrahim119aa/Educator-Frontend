/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getAllTeachers, getTeacher, verifyTeacher } from "@/lib/API/Teacher";
import { useEffect, useState } from "react";
import { Documents, PermanentAddressForm, ResidentialAddressForm, TeacherUpdateForm, TeachingLocationPreference, TeachingSubjects } from "../../Teacher";
import { toast } from "sonner";
import Image from "next/image";
import { LoaderCircle } from "lucide-react";
import { Teacher } from "@/types/teacher";

const ListAllTeachers = () => {

    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [_loading, setLoading] = useState(true);
    const [_error, setError] = useState({ backendError: "" });
    
    const [loadingTeacherData, setLoadingTeacherData] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null); 
    const [selectedTeacherData, setSelectedTeacherData] = useState<any | null>(null);

    const fetchTeachers = async () => {
        try {
            setLoading(true);
            const res: any = await getAllTeachers();
            setTeachers(res);
            setLoading(false);
        } catch (e: any) {
            setError({ backendError: e.message });
        } finally {
            setLoading(false);
        }
    };

    const getTeacherById = async (teacherId: string) => {
        try{
            setLoadingTeacherData(true);
            const response = await getTeacher(teacherId);
            setSelectedTeacherData(response as Teacher);
            setLoadingTeacherData(false);
        }catch(e){
            console.error(e);
        }
    }

    const verify = async (teacherId: string) => {
        try{
            const response : any = await verifyTeacher(teacherId) as any;
            if(response.success){
                setSelectedTeacher(null);
                setSelectedTeacherData(null);
                // show message
                toast(response?.message, {
                    action: {
                        label: "Close",
                        onClick: () => { }
                    },
                })
            }else{
                if(response.error){
                    toast(response?.error, {
                        action: {
                            label: "Close",
                            onClick: () => { }
                        },
                    });
                }
            }
        }catch(e){
            console.error(e);
        }
    }

    useEffect(() => {
        if(selectedTeacher){
            getTeacherById(selectedTeacher.teacher_id);
        }
        
    }, [selectedTeacher]);

    useEffect(() => {
        fetchTeachers();
    }, []);

    return (
        <div className="overflow-auto max-md:w-screen max-md:pt-16">
            <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>
                    <TableRow>
                        <TableHead>Teacher Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Gender</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {teachers.map((teacher) => (
                        <TableRow key={teacher.teacher_id}>
                            <TableCell className="font-medium">{teacher.first_name} {teacher.middle_name} {teacher.last_name}</TableCell>
                            <TableCell>{teacher.email}</TableCell>
                            <TableCell>{teacher.gender}</TableCell>
                            <TableCell className="text-right space-x-2">
                                <Button variant="secondary" onClick={() => setSelectedTeacher(teacher)}>View</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                </TableFooter>
            </Table>

            {/* A modal to show teacher details */}
            <Dialog open={!!selectedTeacher} onOpenChange={() => {setSelectedTeacher(null); setSelectedTeacherData(null)}}>
                <DialogContent className="max-w-[90svw] max-h-[90svh] overflow-scroll z-10">
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <div className="overflow-scroll">
                        {loadingTeacherData && 
                            <div className="flex items-center justify-center">
                                <LoaderCircle size={64} color="gray" className="animate-spin"/>
                            </div>
                        }
                        {
                            !!selectedTeacherData && (
                                <div className="space-y-5">
                                    <div className="flex flex-wrap gap-5 items-center justify-center border rounded-md p-5">
                                        <div className="aspect-square">
                                        <Image src={`${process.env.NEXT_PUBLIC_BACKEND}/public/assets/images/teacher/${selectedTeacherData.photo}`} alt="Teacher Profile Picture" width={256} height={256} className="w-64 max-h-64 rounded-full !aspect-square" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            {/* basic teacher details */}
                                            <h3 className="font-semibold">Name: {selectedTeacherData.first_name} {selectedTeacherData.middle_name} {selectedTeacherData.last_name}</h3>
                                            <span>Email: {selectedTeacherData.email}</span>
                                            <span>Phone: {selectedTeacherData.phone}</span>
                                            <span>Gender: {selectedTeacherData.gender}</span>
                                            <span>Qualification: {selectedTeacherData.education_qualification}</span>
                                        </div>
                                    </div>
                                    <TeacherUpdateForm teacherData={selectedTeacherData} />
                                    <ResidentialAddressForm teacherData={selectedTeacherData } canUpdate={false}/>
                                    <PermanentAddressForm teacherData={selectedTeacherData} canUpdate={false}/>
                                    <TeachingLocationPreference teacherData={selectedTeacherData} setTeacherData={setSelectedTeacherData} canUpdate={false}/>
                                    <TeachingSubjects teacherData={selectedTeacherData} canUpdate={false}/>
                                    <Documents teacherData={selectedTeacherData} canUpdate={false} canReadURL={true}/>
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" onClick={()=>{setSelectedTeacher(null); setSelectedTeacherData(null);}}>Cancel</Button>
                                        <Button onClick={()=>verify(selectedTeacherData.teacher_id)} disabled={selectedTeacherData.is_verified === 1}>{selectedTeacherData.is_verified === 1 ? "Already Verified" : "Verify"}</Button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </DialogContent>
            </Dialog>

            {/* Pagination */}
            {/* <div className="p-5">
                <Pagination className="w-full">
                    <PaginationContent className="w-full items-center justify-center">
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" isActive>
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div> */}
        </div>
    );
}

export default ListAllTeachers;