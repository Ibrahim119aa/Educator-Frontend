/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Suspense, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StudentRegistrationForm from "@/components/StudentRegistrationForm";
import TeacherRegistrationForm from "@/components/TeachersRegistrationForm";
import { useSearchParams } from 'next/navigation'
import CarouselCode from "@/components/Carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import ScrollAnimation from "@/components/ScrollAnimation";
import { BsFillTelephoneFill, BsWhatsapp } from "react-icons/bs";

const howWeHelp = [
  {
    title: "Assessment and Matching",
    content: "We begin by understanding the specific academic needs and learning goals of each student. Through a detailed assessment, we match students with experienced teachers who specialize in the required subjects and grade levels.",
    color: 'bg-[#00b894] text-white'
  },
  {
    title: "Personalized Learning Plans",
    content: "Our teachers develop personalized learning plans tailored to each student's strengths, weaknesses, and learning style. These plans ensure that the educational content is relevant, engaging, and aligned with the student's curriculum.",
    color: 'bg-indigo-600 text-white'
  },
  {
    title: "One-on-One Coaching Sessions",
    content: "We conduct in-home coaching sessions that provide focused attention and support. Our teachers work closely with students to clarify concepts, reinforce learning, and build confidence in tackling academic challenges.",
    color: 'bg-[#6c5ce7] text-white'
  },
  {
    title: "Continuous Monitoring and Feedback",
    content: "Throughout the coaching journey, we monitor progress closely and provide regular feedback to students and their parents. Adjustments to learning plans are made as necessary to ensure ongoing improvement and achievement of academic goals.",
    color: 'bg-[#006fff] text-white'
  }
]

const Component = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const formRef = useRef<null | any>(null);

  const scrollToForm = () => {
    if (!formRef.current) return;
    formRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <main className="">
      <CarouselCode>
        {
          [
            <div className="md:h-[600px] 2xl:h-[900px]" key={1}>
              <div className="h-full flex relative">
                <div className="flex-1 h-full flex flex-col justify-center items-center p-10 px-10 w-full md:px-14 bg-black/70 md:bg-transparent text-white md:text-black md:dark:text-gray-100">
                  <ScrollAnimation animationClass="slide-up" className="delay-0">
                    <div className="max-w-screen-md">
                      <h1 className="font-bold text-5xl text-center md:text-left">Welcome to OEducators</h1>
                      <p className="py-5">Connecting the Best Local Teachers to Students</p>
                      <p className="py-5 md:text-gray-500">
                        At OEducators, we bridge the gap between students and the finest local educators in your area. <span className="hidden md:inline">Our platform ensures that every student has access to high-quality, personalized instruction from experienced teachers who are passionate about education. Whether you need help with foundational subjects or advanced coursework, we are here to help you succeed. </span>
                      </p>
                      <p>
                        Sign up today to find the perfect home tutor for your child&apos;s learning needs.
                      </p>
                      <div className="pt-10">
                        <Link href="/">
                          <button className="bg-primary dark:bg-primary-foreground py-3 px-10 text-white rounded-md" onClick={scrollToForm}>Sign Up Now</button>
                        </Link>
                      </div>
                    </div>
                  </ScrollAnimation>
                </div>
                <div className="flex-1 absolute md:relative -z-10 h-full">
                  <Image src="/indianTeacher.jpeg" alt="Teacher" width={300} height={300} className="object-cover h-full w-full" />
                </div>
                <div>
                </div>
              </div>
            </div>
          ]
        }
      </CarouselCode>
      <div className="flex items-center justify-center p-5" ref={formRef}>
        <Tabs defaultValue={tab || 'student'} className="w-[700px]">
          <div className="flex items-center justify-center ">
            <TabsList className="[&>*]:px-10">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="teacher">Teacher</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="student">
            <StudentRegistrationForm />
          </TabsContent>
          <TabsContent value="teacher">
            <TeacherRegistrationForm />
          </TabsContent>
        </Tabs>
      </div>
      <div className="relative py-32">
        <div className="max-w-screen-lg mx-auto p-5 flex flex-wrap gap-2">
          <div className="flex-1 min-w-64 w-full">
            <ScrollAnimation animationClass="slide-right">
              <Image src="/img2.jpeg" className="rounded-md" width={500} height={500} alt="Who we are" />
            </ScrollAnimation>
          </div>
          <Card className="flex-1 relative">
            <ScrollAnimation animationClass="fade-up">
              <CardHeader>
                <CardTitle className="text-center">Who are we?</CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                At <strong>OEducators</strong>, we are dedicated to connecting students with highly qualified teachers who bring education directly to their doorstep. With a commitment to academic excellence and personalized learning, we strive to make education accessible and enriching for students at every school level.
              </CardContent>
            </ScrollAnimation>
            {/* <svg className="absolute bottom-0 -scale-x-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path className="fill-primary" fill-opacity="1" d="M0,64L60,101.3C120,139,240,213,360,250.7C480,288,600,288,720,282.7C840,277,960,267,1080,266.7C1200,267,1320,277,1380,282.7L1440,288L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          </svg> */}
          </Card>
        </div>
        <div className="max-w-screen-lg mx-auto p-5 flex flex-row-reverse flex-wrap gap-2">
          <div className="flex-1 min-w-64 w-full">
            <ScrollAnimation animationClass="slide-left">
              <Image src="/img8.jpeg" className="rounded-md" width={500} height={500} alt="Who we are" />
            </ScrollAnimation>
          </div>
          <Card className="flex-1 relative">
            <ScrollAnimation animationClass="fade-down">
              <CardHeader>
                <CardTitle className="text-center">What we do?</CardTitle>
                <CardContent className="p-5">
                  We specialize in providing experienced teachers for in-home coaching classes across all school levels. Whether your child needs support with foundational subjects or seeks advanced tutoring in specific disciplines, our carefully selected educators tailor their approach to meet individual learning needs. By bringing quality education into the comfort of your home, we aim to foster a supportive environment where students can thrive academically and reach their full potential.
                </CardContent>
              </CardHeader>
            </ScrollAnimation>

          </Card>
        </div>
      </div>
      <div className="bg-primary/10 pt-5 my-5">
        <div className="max-w-screen-xl mx-auto p-10 pb-0 dark:pb-10  min-h-96 flex flex-wrap">
          <div className="flex-1 flex flex-col gap-5 justify-center min-w-64">
            <h3 className="text-3xl font-bold">Get your personal tutor today!</h3>
            <p className="text-gray-600 dark:text-gray-200">Connect with the best local teachers and unlock your potential. Join OEducators and take the first step towards academic success with a personal mentor from your community.</p>
            <div>
              <button className="bg-primary dark:bg-primary-foreground py-3 px-10 text-white rounded-md" onClick={scrollToForm}>Sign Up Now</button>
            </div>
          </div>
          <div className="flex-1 min-w-64 flex items-end">
            <Image src="/indianStudent.jpg" width={500} height={500} alt="Indian Students" className="mix-blend-multiply dark:mix-blend-difference w-full bg-contain" />
          </div>
        </div>
      </div>
      <div className="p-5 py-10">
        <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5">
          {
            howWeHelp.map((item, index) => (
              <ScrollAnimation animationClass="slide-up" key={index}>
                <Card className={`h-full border-b-4 shadow-md transition ease-in-out duration-500 hover:border-b-gray-400 ${item.color}`}>
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                    <CardContent className="px-0 py-5 text-sm">{item.content}</CardContent>
                  </CardHeader>
                </Card>
              </ScrollAnimation>
            ))
          }
        </div>
      </div>
      <div className="bg-primary/10 my-5 py-10">
        <div className="max-w-screen-xl mx-auto px-10 pb-0 min-h-96 flex flex-wrap">
          <div className="flex-1 flex flex-col gap-5 justify-evenly items-center ">
            <h3 className=" text-gray-800 dark:text-white font-bold text-3xl">Still Confused?</h3>
            <div className="w-full flex gap-x-10 gap-y-10 flex-wrap items-center justify-center">
              <div className=" text-center">
                <p className=" text-xl font-bold py-5">Call us Now</p>
                <Link href="tel:+918292168666">
                  <button className="bg-primary dark:bg-primary-foreground py-3 px-10 text-white rounded-md flex gap-2 items-center justify-center"><BsFillTelephoneFill /> +91 8292168666</button>
                </Link>
              </div>
              <div className="hidden md:block h-full w-1 border-l border-gray-400"></div>
              <div className=" text-center">
                <p className=" text-xl font-bold py-5">Whatsapp Now!</p>
                <Link href="https://api.whatsapp.com/send?phone=+918292168666&text=Good Morning sir, I would like to know more about OEducators." target="_blank">
                  <button className="bg-primary dark:bg-primary-foreground py-3 px-10 text-white rounded-md flex gap-2 items-center justify-center"><BsWhatsapp /> +91 8292168666</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default function Home() {


  return (

    <Suspense fallback={<div className='w-screen flex items-center justify-center' style={{ height: '100vh' }}><div className='border-gray-300 animate-spin rounded-full' style={{ height: '200px', width: '200px', borderWidth: '0px', borderLeftWidth: '4px', borderTopWidth: '4px', boxSizing: 'border-box' }}></div></div>}>
      <Component />
    </Suspense>
  );
}
