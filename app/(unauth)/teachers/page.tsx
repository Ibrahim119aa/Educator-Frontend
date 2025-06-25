/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { fetchTeachers } from "@/lib/API/Teacher";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";

type CardProps = {
    name: string
    img: string
    designation: string
    teachingLocationNames: string
    verified?: boolean
}
const Card = ({ name, img, designation, teachingLocationNames, verified }: CardProps) => {
    return (
        <div className="group max-w-[300px] mx-auto bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-900 rounded-md shadow-md p-5 hover:bg-accent hover:text-foreground transition-colors duration-300 ease-in-out ">
            {/* <img src={img} alt={name} className="h-40 w-40 object-cover rounded-full mx-auto" /> */}
            <Image src={img} alt={name} width={160} height={160} className="h-40 w-40 object-cover rounded-full mx-auto" />
            <h2 className="text-xl font-bold text-center mt-3 whitespace-nowrap relative"><span className="[&+*]:hover:opacity-100">{name.length > 15 ? name.substring(0, 15) + '...' : name} </span>
                {/* show full name on hover */}
                <span className="select-none opacity-0 transition-opacity ease-in-out duration-500 absolute -top-6 left-0 text-xs w-fit bg-slate-800 text-white font-normal py-1 px-3 rounded-md">{name}</span>
                {verified &&
                    <span className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48" className="inline-block ml-2 [&+*]:hover:opacity-100 ">
                            <polygon className="fill-primary dark:fill-primary-foreground" points="29.62,3 33.053,8.308 39.367,8.624 39.686,14.937 44.997,18.367 42.116,23.995 45,29.62 39.692,33.053 39.376,39.367 33.063,39.686 29.633,44.997 24.005,42.116 18.38,45 14.947,39.692 8.633,39.376 8.314,33.063 3.003,29.633 5.884,24.005 3,18.38 8.308,14.947 8.624,8.633 14.937,8.314 18.367,3.003 23.995,5.884"></polygon><polygon fill="#fff" points="21.396,31.255 14.899,24.76 17.021,22.639 21.428,27.046 30.996,17.772 33.084,19.926"></polygon>
                        </svg>
                        <span className="select-none opacity-0 transition-opacity ease-in-out duration-500 absolute -top-6 -left-3 text-xs w-fit bg-slate-800 text-white font-normal py-1 px-3 rounded-md">Verified</span>
                    </span>
                }
            </h2>
            <div className="text-center">
                <p className="text-center text-slate-500 ">{designation}</p>
                <span>{teachingLocationNames}</span>
            </div>
        </div>
    )
}

const Teacher = () => {
    const [teachers, setTeachers] = useState<any>([]);
   
  
    const [selectedTeacherData, setSelectedTeacherData] = useState<any | null>(null);

    const router = useRouter();

    const getTeachers = async () => {
        const res = await fetchTeachers();
        console.log("This is get  teacher");
        console.log(res);

        setTeachers(res);
    }
    useEffect(() => {
        getTeachers();
    }, []);

    const handleCardClick = (teacher: any) => {
        const { first_name, middle_name, last_name, teacher_id } = teacher;
        const fullName = `${first_name}-${middle_name}-${last_name}`;

        // Encode the parameters to handle special characters
        const queryParams = new URLSearchParams({
            name: fullName,
            id: teacher_id
        }).toString();

        // Update the URL with query parameters without navigating to a new page
        router.replace(`?${queryParams}`, undefined);
        setSelectedTeacherData(teacher);
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const teacherId = queryParams.get('id');
        if (teacherId) {
            const teacher = teachers.find((teacher: any) => teacher.teacher_id === teacherId);
            if (teacher) {
                setSelectedTeacherData(teacher);
            }
        }
    }, [teachers]);

    const clearQueryParams = () => {
        const url = new URL(window.location.href);
        url.search = '';
        window.history.pushState({}, '', url.toString());
    }


    return (
        <div className="container p-5">
            <h1 className="text-center text-3xl font-bold p-10">Our Teachers</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 content-start gap-5 min-h-screen">
                {
                    teachers.map((teacher: any, index: number) => {

                        // Function to get unique teaching location names separated by commas
                        const getUniqueLocationNames = (locations: any) => {
                            const locationNames = new Set();

                            locations.forEach((location: any) => {
                                locationNames.add(location.location_name);
                            });

                            // Join the unique names with commas
                            return Array.from(locationNames).join(', ');
                        };

                        // Get the unique location names
                        const teachingLocationNames = getUniqueLocationNames(teacher.teaching_locations);

                        return <div key={index} onClick={() => handleCardClick(teacher)}><Card name={`${teacher.first_name} ${teacher.middle_name} ${teacher.last_name}`} img={`${process.env.NEXT_PUBLIC_BACKEND}/public/assets/images/teacher/${teacher.photo}`} designation={teacher.designation} teachingLocationNames={teachingLocationNames} verified={teacher.is_verified === "1"} /></div>
                    })
                }

            </div>
            <Dialog open={!!selectedTeacherData} onOpenChange={() => { setSelectedTeacherData(null); clearQueryParams(); }}>
                <DialogContent className="max-w-[90svw] max-h-[90svh] w-fit min-w-[300px] overflow-scroll z-10" aria-description="Teacher Details">
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <div className="overflow-scroll">
                      
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
                                            {selectedTeacherData.gender && <span>Gender: {selectedTeacherData.gender}</span>}
                                            {selectedTeacherData.education_qualification && <span>Qualification: {selectedTeacherData.education_qualification}</span>}
                                            {selectedTeacherData.teaching_experience_years && <span>Teaching Experience: {selectedTeacherData.teaching_experience_years} Years</span>}
                                            <div className="mt-5 flex items-center justify-center">
                                                <Button variant="default" className="space-x-2 bg-green-500 hover:bg-green-600" onClick={() => window.open(`https://api.whatsapp.com/send?phone=+918292168666&text=Good Morning sir, I would like to contact you for ${selectedTeacherData.first_name} ${selectedTeacherData.middle_name} ${selectedTeacherData.last_name}.`, "_blank")}><FaWhatsapp size={24} /> <span>Get in touch</span></Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        {
                                            selectedTeacherData?.teaching_locations?.length > 0 &&
                                            <h3 className="font-semibold">Preferred Teaching Locations:</h3>
                                        }
                                    </div>
                                    <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-2">
                                        {
                                            selectedTeacherData.teaching_locations.map((location: any, index: number) => (
                                                <div key={index} className="flex items-center justify-center gap-5 border border-primary bg-primary/50 px-5 py-2 rounded-md">
                                                    <span>{location.ward_no_panchayat}, {location.location_name}</span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Teacher